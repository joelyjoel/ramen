
import { System } from "./systems/system";


import { GameStateTracker, GameStateUpdate } from "./GamestateTracker";
import { deepAssign } from "./util";
import { UserInputReport } from "./UserInputReporter";

export interface IOObject {
    userInput: UserInputReport[];
    /** The number of seconds elapsed since the previous frame */
    elapsed: number;
    t: number;
}

export function mergeGameStateUpdates(a:GameStateUpdate, b: GameStateUpdate) {
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
    systemPromises: Promise<any>
    t: number;

    constructor({initialState, systems}) {
        this.t = 0;

        this.stateTracker = new GameStateTracker(
            initialState, 
        );

        this.systems = [];

        this.systemPromises = Promise.all(
            systems.map(sys => this.addSystem(sys))
        );
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


        ++this.t;

        return stateUpdate;
    }

    get currentState() {
        return this.stateTracker.state;
    }

    async addSystem(system:System) {
        if(this.systems.some(a => a.spawnPrefix == system.spawnPrefix))
            throw new Error(`System spawnPrefix collision: ${system.spawnPrefix}.`)

        for(let components of system.reads)
            this.stateTracker.addGroup(components);
        
        this.systems.push(system);

        await system.initialise();
    }
}

