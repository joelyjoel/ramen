import { System } from "../system";
import { VelocityComponentState } from "./Velocity";

export interface FrictionComponentState {
    friction: number;
}

export const FrictionSystem = new System({
    reads: ['velocity', 'friction'],
    writes: ['velocity'],

    individualBehaviour(e: {friction:FrictionComponentState, velocity:VelocityComponentState}) {
        // TODO: Apply friction according to elapsed frame time.
        return {
            velocity: {
                xspeed: e.velocity.xspeed * e.friction.friction,
                yspeed: e.velocity.yspeed * e.friction.friction
            }
        }
    }
})