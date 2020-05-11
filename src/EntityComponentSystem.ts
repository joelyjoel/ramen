import { GameState } from "./GameState";
import { System } from "./systems/system";
import { IOObject } from "./Game";
import { advanceState } from "./advanceState";



export interface ComponentState {};

export class EntityComponentSystem {
    currentState: GameState;
    systems: System[];

    constructor({initialState, systems}) {
        this.currentState = initialState;
        this.systems = systems
    }

    advanceState(io:IOObject) {
        this.currentState = advanceState(this.currentState, this.systems, io);
    }

    get frame() {
        return this.currentState.frame;
    }
}

