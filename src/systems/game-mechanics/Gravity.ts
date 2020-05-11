import { System } from "../system";
import { VelocityComponentState } from "./Velocity";
import { IOObject, Game } from "../../Game";

export interface GravityComponentState {
    g?: number,
}

export const GravitySystem = new System({
    reads: ['gravity', 'velocity'],
    writes: ['velocity'],

    individualBehaviour(e: {velocity: VelocityComponentState, gravity: GravityComponentState}, io: IOObject) {
        let {g=9.81} = e.gravity
        let yspeed = e.velocity.yspeed + g * io.elapsed
        return {
            velocity: {
                yspeed,
            }
        }
    }
})