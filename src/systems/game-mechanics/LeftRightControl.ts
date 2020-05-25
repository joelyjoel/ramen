import { System, IntrospectiveSystem } from "../system";
import { VelocityComponentState } from "./Velocity";
import { IOObject } from "../../EntityComponentSystem";

export interface LeftRightControlComponentState {
    acceleration: number;
    user: number;
}

export class LeftRightControlSystem extends IntrospectiveSystem<{velocity: VelocityComponentState, leftRightControl: LeftRightControlComponentState}> {
    constructor() {
        super({
            reads: ['velocity', 'leftRightControl'],
            writes: ['velocity'],
        })
    }

    individualBehaviour(e:{velocity: VelocityComponentState; leftRightControl: LeftRightControlComponentState}, io:IOObject) {
        let userInput = io.userInput[e.leftRightControl.user];
        if(userInput.downKeys[37]) {
            let xspeed = e.velocity.xspeed - (e.leftRightControl.acceleration || 5) * io.elapsed
            return {velocity: {xspeed}}
        } else if(userInput.downKeys[39]) {
            return {
                velocity: {xspeed: e.velocity.xspeed + e.leftRightControl.acceleration * io.elapsed}
            }
        }
    }
}