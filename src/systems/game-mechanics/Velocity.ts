
import { PositionComponentState } from "./Position";
import { System, IntrospectiveSystem } from "../system";
import { IOObject } from "../../Game";
import { ComponentState } from "../../EntityComponentSystem";

export interface VelocityComponentState extends ComponentState {
    xspeed: number;
    yspeed: number;
}


// export const VelocitySystem = new System({
//     reads: ['position', 'velocity'],
//     writes: ['position'],
    
//     individualBehaviour(states: {position: PositionComponentState, velocity:VelocityComponentState}, io:IOObject) {
//         let {position, velocity} = states;
//         return {
//             position: {
//                 x: position.x + velocity.xspeed * io.elapsed,
//                 y: position.y + velocity.yspeed * io.elapsed,
//             },
//             velocity,
//         }
//     }
// })

export class VelocitySystem extends IntrospectiveSystem<{
    velocity: VelocityComponentState, position: PositionComponentState
}> {

    constructor() {
        super({
            reads: ['velocity', 'position'],
            writes: ['position'],
        })
    }
    individualBehaviour(e: {velocity: VelocityComponentState, position: PositionComponentState}, io:IOObject) {
        return {
            position: {
                x: e.position.x + e.velocity.xspeed,
                y: e.position.y + e.velocity.yspeed,
            }
        }
    }
}