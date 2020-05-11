import { System } from "../system";
import { VelocityComponentState } from "./Velocity";
import { IOObject, Game } from "../../Game";

export interface LeftRightControlComponentState {
    acceleration: number;
}

export const LeftRightControlSystem = new System({
    reads: ['velocity', 'leftRightControl'],
    writes: ['velocity'],

    individualBehaviour(e:{velocity: VelocityComponentState; leftRightControl: LeftRightControlComponentState}, io:IOObject) {
        if(io.userInput.downKeys[37]) {
            let xspeed = e.velocity.xspeed - (e.leftRightControl.acceleration || 5) * io.elapsed
            console.log(xspeed, e.leftRightControl.acceleration)
            return {velocity: {xspeed}}
        } else if(io.userInput.downKeys[39]) {
            return {
                velocity: {xspeed: e.velocity.xspeed + e.leftRightControl.acceleration * io.elapsed}
            }
        } else
            return {}
    }
})