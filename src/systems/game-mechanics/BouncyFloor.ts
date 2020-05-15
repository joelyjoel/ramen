import { System } from "../system";
import { PositionComponentState } from "./Position";
import { VelocityComponentState } from "./Velocity";
import { IOObject } from "../../Game";

export interface BouncyFloorComponentState {
    y: number;
    bounce?: number;
}

export const BouncyFloorSystem = new System({
    reads: ['position', 'velocity', 'bouncyFloor'],
    writes: ['position', 'velocity'],

    individualBehaviour(e: {
        position:PositionComponentState; 
        velocity:VelocityComponentState;
        bouncyFloor: BouncyFloorComponentState;
    }, io:IOObject) {
        let {bounce = 1} = e.bouncyFloor
        if(e.position.y > e.bouncyFloor.y) {
            return {
                position: {y: e.bouncyFloor.y},
                velocity: {yspeed: -Math.abs(e.velocity.yspeed) * bounce},
            }
        } else {
            return {}
        }
    }
});