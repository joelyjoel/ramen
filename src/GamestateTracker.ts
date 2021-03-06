import { GameState, Entity } from "./GameState";
import { timingSafeEqual } from "crypto";
import { deepAssign, entityHasComponents, cloneGameState } from "./util";
import { ComponentState } from "./EntityComponentSystem";

export interface GameStateUpdate {
    // create?: EntityUpdate[];
    [key: string]: EntityUpdate | null;
}

export interface EntityUpdate {
    [key: string]: ComponentStateUpdate;
}

export type ComponentStateUpdate = any//Partial<ComponentState>

export interface EntityGroup {
    name: string;
    /** Names of components required for membership of the group. */
    components: string[];
    /** ID's of entities in the group. */
    entities: string[];
}

export function getEntityGroupName(components:string[]) {
    return components.sort().join('-');
}

/** The game state tracker class applies updates to a game state (in place) and keeps a set of entity groups updated  */
export class GameStateTracker {
    state: GameState;

    groups: {
        [name: string]: EntityGroup;
    };
    idCounter: number;

    constructor(initialState:GameState, groups:string[][] = []) {
        this.setState(cloneGameState(initialState));
        for(let group of groups)
            this.addGroup(group);

        this.idCounter = 0;

    }

    addGroup(components:string[]) {
        // Generate the name
        let name = getEntityGroupName(components);

        // Check whether group exists
        if(this.groups[name])
            return this.groups[name];

        // Find entities which match the group.
        let entities:string[] = [];
        for(let id in this.state.entities) {
            let e = this.state.entities[id];
            if(entityHasComponents(e, components))
                entities.push( id );
        }

        let group:EntityGroup = {
            name,
            components,
            entities,
        }

        this.groups[name] = group;
    }

    fetchGroup(name:string) {
        return this.groups[name];
    }

    fetchGroupState(name: string) {
        let ids = this.groups[name].entities;
        let substate = {}
        for(let id of ids)
            substate[id] = this.state.entities[id];
        
        return substate
    }

    modifyState(updates:GameStateUpdate) {
        // For each entity,
        // if(updates.create) {
        //     for(let newEntity of updates.create) {
        //         let id = this.generateNewEntityId(updates);
        //         this.createEntity(id, {id, ...newEntity});
        //     }
        // }
        for(let id in updates) {
            if(updates[id] === undefined) {
                // Skip, maybe log a warning because this shouldn't happen.
                console.warn("This shouldn't happen.")
                continue;
            }

            if(updates[id] === null) {
                // Delete entity
                this.deleteEntity(id);
            } else {
                // If entity exists,
                if(this.state.entities[id]) {
                    // modify the entity.
                    this.modifyEntity(id, updates[id]);
                } else {
                    // otherwise create the entity.
                    if(typeof updates[id].id == 'string'){
                        this.createEntity(id, updates[id] as Entity);
                    }else
                        throw new Error(
                            `Attempt to modify entity (id = '${id}') which does not exist. Update = ${
                                JSON.stringify(updates, null, 4)
                            }`
                        )
                }
            }
        }
    }

    fetchEntity(id:string) {
        return this.state.entities[id];
    }

    deleteEntity(id:string) {
        let e = this.state.entities[id]
        delete this.state.entities[id];
        for(let name in this.groups) {
            if(entityHasComponents(e, this.groups[name].components)) {
                console.log(`Removing entity #${id} from group '${name}'`)
                let idx = this.groups[name].entities.indexOf(id);
                if(idx != -1)
                    this.groups[name].entities.splice(idx, 1);
                else
                    console.warn(`Entity #${id} was not in group as expected: '${name}'`)
                
            }
        }
    }

    createEntity(id:string, initialState:Entity) {
        console.log(`## Creating entitiy: ${id}\ninitial state:`, initialState)
        let e = {id};
        this.state.entities[id] = e;

        this.modifyEntity(id, initialState);
    }

    modifyEntity(id:string, update:EntityUpdate) {
        const e = this.state.entities[id];
        for(let component in update) {
            if(update[component] == null) {
                // remove the component
                delete e[component];
                for(let name in this.groups)
                    if(this.groups[name].components.includes(component)) {
                        let idx = this.groups[name].entities.indexOf(id);
                        if(idx != -1)
                            this.groups[name].entities.splice(idx, 1);
                    }

            } else if(e[component]) {
                // modify the component
                deepAssign(e[component], update[component])

            } else {
                // add the component
                e[component] = update[component];
                for(let name in this.groups) {
                    let group = this.groups[name]
                    if(group.components.includes(component) && entityHasComponents(e, group.components)) {
                        console.log(`## adding ${id} to group ${name}`)
                        group.entities.push(id);
                    }
                        
                }
            }
        }
    }

    setState(state:GameState) {
        this.state = state;
        this.rebuildGroups();
    }

    rebuildGroups() {
        let groupDefs = [];
        for(let name in this.groups)
            groupDefs.push(this.groups[name].components);

        this.groups = {};

        for(let components of groupDefs)
            this.addGroup(components);
    }

    generateNewEntityId(update?:GameStateUpdate) {
        let id = this.idCounter + 1;
        if(update)
            while(this.state.entities[id] || update[id])
                ++id;
        else
            while(this.state.entities[id])
                ++id;

        this.idCounter = id;

        return id.toString();
    }
}