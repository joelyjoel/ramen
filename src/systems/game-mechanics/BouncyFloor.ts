import { System, IntrospectiveSystem } from "../system";
import { PositionComponentState } from "./Position";
import { VelocityComponentState } from "./Velocity";
import { IOObject } from "../../EntityComponentSystem";

export interface BouncyFloorComponentState {
    bounce?: number;
}


export class BouncyFloorSystem extends IntrospectiveSystem<{
    position:PositionComponentState; 
    velocity:VelocityComponentState;
    bouncyFloor: BouncyFloorComponentState;
}> {
    left: number;
    y: number;
    right: number;
    constructor({y, left = null, right = null}:{y:number; left?: number; right?: number;}) {
        super({
            reads: ['position', 'velocity', 'bouncyFloor'],
            writes: ['position', 'velocity'],
        })

        this.y = y;
        this.right = right;
        this.left = left;
    }

    individualBehaviour(e: {
        position:PositionComponentState; 
        velocity:VelocityComponentState;
        bouncyFloor: BouncyFloorComponentState;
    }, io:IOObject) {
        let {bounce = 1} = e.bouncyFloor
        if(
            e.position.y > this.y &&
            (this.left === null || this.left < e.position.x) &&
            (this.right === null || this.right > e.position.x)
        ) {
            return {
                position: {y: this.y},
                velocity: {yspeed: -Math.abs(e.velocity.yspeed) * bounce},
            }
        } else {
            return {}
        }
    }
}