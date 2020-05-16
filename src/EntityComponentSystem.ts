
import { System } from "./systems/system";
import { IOObject } from "./Game";

import { GameStateTracker } from "./GamestateTracker";



export interface ComponentState {};

export class EntityComponentSystem {
    stateTracker: GameStateTracker;
    systems: System[];

    constructor({initialState, systems}) {
        this.stateTracker = new GameStateTracker(
            initialState, 
        );
        this.systems = systems;

        for(let system of systems) {
            for(let components of system.reads)
                this.stateTracker.addGroup(components);
        }
    }

    advanceState(io:IOObject) {
        // Loop through the systems,
        for(let system of this.systems) {
            // Select groups
            let groups = system.groupNames.map(
                groupName => this.stateTracker.fetchGroupState(groupName)
            )

            // Apply behaviour to the matches
            let update = system.behaviour(groups, io);
            if(update != undefined)
                this.stateTracker.modifyState(update);


            // let results = system.behaviour(matches);

        }
    }
}

