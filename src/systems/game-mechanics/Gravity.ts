import { System, IntrospectiveSystem } from "../system";
import { VelocityComponentState } from "./Velocity";
import { IOObject, Game } from "../../Game";

export interface GravityComponentState {
}

export class GravitySystem extends IntrospectiveSystem<{velocity: VelocityComponentState, gravity: GravityComponentState}> {
    g: number;
    constructor(options:{g?:number}={}) {
        super({
            reads: ['gravity', 'velocity'],
            writes: ['velocity'],
        })

        this.g = options.g || 9.81;
    }

    individualBehaviour(e: {velocity: VelocityComponentState, gravity: GravityComponentState}, io: IOObject) {
        let yspeed = e.velocity.yspeed + this.g * io.elapsed
        return {
            velocity: {
                yspeed,
            }
        }
    }
}