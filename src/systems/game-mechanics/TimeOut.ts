import { System } from "../system";
import { IOObject } from "../../Game";

export interface TimeOutComponentState {
    timeRemaining: number;
}

export const TimeOutSystem = new System({
    reads: ['timeOut'],
    
    individualBehaviour(e: {timeOut:TimeOutComponentState}, io:IOObject) {
        let timeRemaining = e.timeOut.timeRemaining - io.elapsed;

        if(timeRemaining > 0)
            return {timeOut: {timeRemaining}}
        else
            // Delete the entitiy
            return null;
    }
})