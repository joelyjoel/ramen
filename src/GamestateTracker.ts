import { GameState, Entity } from "./GameState";
import { timingSafeEqual } from "crypto";
import { deepOverwrite, entityHasComponents } from "./util";
import { ComponentState } from "./EntityComponentSystem";

export interface GameStateUpdate {
    [key: number]: EntityUpdate;
}

export interface EntityUpdate {
    [key: string]: ComponentStateUpdate;
}

export type ComponentStateUpdate = Partial<ComponentState>

export interface EntityGroup {
    name: string;
    /** Names of components required for membership of the group. */
    components: string[];
    /** ID's of entities in the group. */
    entities: number[];
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

    constructor(initialState:GameState, groups:string[][]) {
        this.setState(initialState);
        for(let group of groups)
            this.addGroup(group);

        console.log(this.groups);
    }

    addGroup(components:string[]) {
        // Generate the name
        let name = getEntityGroupName(components);

        // Check whether group exists
        if(this.groups[name])
            return this.groups[name];

        // Find entities which match the group.
        let entities:number[] = [];
        for(let id in this.state.entities) {
            let e = this.state.entities[id];
            if(entityHasComponents(e, components))
                entities.push( parseInt(id) );
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

    modifyState(updates) {
        // For each entity,
        for(let id in updates) {
            if(updates[id] == undefined) {
                // Skip, maybe log a warning because this shouldn't happen.
                console.warn("This shouldn't happen.")
                continue;
            }

            if(updates[id] == null) {
                // Delete entity
                this.deleteEntity(id);
            } else {
                // If entity exists,
                if(this.state.entities[id]) {
                    // modify the entity.
                    this.modifyEntity(parseInt(id), updates[id]);
                } else {
                    // otherwise create the entity.
                    this.createEntity(parseInt(id), updates[id]);
                }
            }
        }
    }

    fetchEntity(id) {
        return this.state.entities[id];
    }

    deleteEntity(id) {
        let e = this.state.entities[id]
        delete this.state.entities[id];
        for(let name in this.groups) {
            if(entityHasComponents(e, this.groups[name].components)) {
                let idx = this.groups[name].entities.indexOf(id);
                if(idx != -1)
                    this.groups[name].entities.splice(idx, 1);
            }
        }
    }

    createEntity(id:number, initialState) {
        let e = {id};
        this.state.entities[id] = e;

        this.modifyEntity(id, initialState);
    }

    modifyEntity(id:number, update) {
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
                deepOverwrite(e[component], update[component])

            } else {
                // add the component
                e[component] = update[component];
                for(let name in this.groups) {
                    let group = this.groups[name]
                    if(group.components.includes(component) && entityHasComponents(e, group.components))
                        group.entities.push(id);
                        
                }
            }
        }
    }

    // TODO: setState() function
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
}