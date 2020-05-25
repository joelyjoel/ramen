
import { System } from "./systems/system";


import { GameStateTracker, GameStateUpdate } from "./GamestateTracker";
import { deepAssign } from "./util";
import { UserInputReport } from "./UserInputReporter";

export interface IOObject {
    userInput: UserInputReport[];
    /** The number of seconds elapsed since the previous frame */
    elapsed: number;
}

export function mergeGameStateUpdates(a:GameStateUpdate, b: GameStateUpdate) {
    // if(b.create) {
    //     if(a.create)
    //         a.create.push(...b.create);
    //     else
    //         a.create = [...b.create];
    // }

    for(let id in b) {
        if(b[id] === null) {
            a[id] = b[id];
        } if(a[id] !== undefined)
            // WARNING: Could run into shared memory problems with this.
            a[id] = deepAssign(a[id], b[id]);
        else
            a[id] = b[id];
    }
}

export interface ComponentState {
    [key: string]: any
};

export class EntityComponentSystem {
    stateTracker: GameStateTracker;
    systems: System[];

    constructor({initialState, systems}) {
        this.stateTracker = new GameStateTracker(
            initialState, 
        );
        this.checkSystems(systems);
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
                // console.log(system.constructor.name, groupUpdate)
                this.stateTracker.modifyState(groupUpdate);

                mergeGameStateUpdates(stateUpdate, groupUpdate);
            }
        }

        return stateUpdate;
    }

    get currentState() {
        return this.stateTracker.state;
    }

    checkSystems(systems:System[]) {
        for(let i=0; i<systems.length; ++i) {
            let prefixI = systems[i].spawnPrefix;
            for(let j=i+1; j<systems.length; ++j)
                if(systems[j].spawnPrefix == prefixI)
                    throw new Error(`System spawn prefix collision: ${prefixI}. Systems: ${systems[i].constructor} and ${systems[j].constructor}`)
        }
    }
}

