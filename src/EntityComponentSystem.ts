import { GameState } from "./GameState";
import { System } from "./systems/system";
import { IOObject } from "./Game";
import { advanceState } from "./advanceState";
import { GameStateTracker } from "./GamestateTracker";



export interface ComponentState {};

export class EntityComponentSystem {
    stateTracker: GameStateTracker;
    systems: System[];

    constructor({initialState, systems}) {
        this.stateTracker = new GameStateTracker(
            initialState, 
            systems.map(system => system.reads),
        );
        this.systems = systems;
    }

    advanceState(io:IOObject) {
        // Loop through the systems,
        for(let system of this.systems) {
            // Select apropriate group
            let group = this.stateTracker.fetchGroup(system.groupName)

            // Apply behaviour to the matches
            if(system.individualBehaviour) {
                // Loop through each entity in the group
                for(let id of group.entities) {
                    let e = this.stateTracker.fetchEntity(id);
                    let update = system.individualBehaviour(e, io);

                    if(update === undefined)
                        // do nothing
                        continue;

                    if(!system.observeOnly) {
                        if(update === null)
                            this.stateTracker.deleteEntity(id);
                        else
                            this.stateTracker.modifyEntity(id, update)
                    }
                }
            } else if(system.behaviour) {
                let entities = group.entities.map(id => this.stateTracker.fetchEntity(id))
                let update = system.behaviour(entities, io);
                if(!system.observeOnly && update != undefined)
                    this.stateTracker.modifyState(update);
            } else
                throw new Error("System behaviour is undefined.");


            // let results = system.behaviour(matches);

        }
    }
}

