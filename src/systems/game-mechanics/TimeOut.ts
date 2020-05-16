import { System, IntrospectiveSystem } from "../system";
import { IOObject } from "../../Game";

export interface TimeOutComponentState {
    timeRemaining: number;
}

export class TimeOutSystem extends IntrospectiveSystem<{timeOut:TimeOutComponentState}> {

    constructor() {
        super({
            reads: ['timeOut'],
            deletes: true,
        })
    }

    individualBehaviour(e: {timeOut:TimeOutComponentState}, io:IOObject) {
        let timeRemaining = e.timeOut.timeRemaining - io.elapsed;

        if(timeRemaining > 0)
            return {timeOut: {timeRemaining}}
        else
            // Delete the entitiy
            return null;
    }
}

