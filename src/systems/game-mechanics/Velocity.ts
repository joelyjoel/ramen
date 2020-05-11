
import { PositionComponentState } from "./Position";
import { System } from "../system";
import { IOObject } from "../../Game";
import { ComponentState } from "../../EntityComponentSystem";

export interface VelocityComponentState extends ComponentState {
    xspeed: number;
    yspeed: number;
}


export const VelocitySystem = new System({
    reads: ['position', 'velocity'],
    writes: ['position'],
    
    individualBehaviour(states: {position: PositionComponentState, velocity:VelocityComponentState}, io:IOObject) {
        let {position, velocity} = states;
        return {
            position: {
                x: position.x + velocity.xspeed * io.elapsed,
                y: position.y + velocity.yspeed * io.elapsed,
            },
            velocity,
        }
    }
})