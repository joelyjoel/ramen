
import { System } from "./systems/system";
import { IOObject } from "./Game";

import { GameStateTracker, GameStateUpdate } from "./GamestateTracker";
import { deepAssign } from "./util";

export function mergeGameStateUpdates(a:GameStateUpdate, b: GameStateUpdate) {
    if(b.create) {
        if(a.create)
            a.create.push(...b.create);
        else
            a.create = [...b.create];
    }

    for(let id in b) {
        if(id == 'create')
            continue;
        
        if(a[id])
            // WARNING: Could run into shared memory problems with this.
            deepAssign(a[id], b[id]);
        else
            a[id] = b[id];
    }
}

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
        let stateUpdate:GameStateUpdate = {};

        // Loop through the systems,
        for(let system of this.systems) {
            // Select groups
            let groups = system.groupNames.map(
                groupName => this.stateTracker.fetchGroupState(groupName)
            )

            // Apply behaviour to the matches
            let groupUpdate = system.behaviour(groups, io);
            if(groupUpdate != undefined) {
                this.stateTracker.modifyState(groupUpdate);

                mergeGameStateUpdates(stateUpdate, groupUpdate);
            }
        }

        return stateUpdate;
    }
}

