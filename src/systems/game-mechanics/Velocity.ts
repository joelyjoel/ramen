
import { PositionComponentState } from "./Position";
import { System, IntrospectiveSystem } from "../system";
import { ComponentState } from "../../EntityComponentSystem";

export interface VelocityComponentState extends ComponentState {
    xspeed: number;
    yspeed: number;
}

export class VelocitySystem extends IntrospectiveSystem<{
    velocity: VelocityComponentState, position: PositionComponentState
}> {

    constructor() {
        super({
            reads: ['velocity', 'position'],
            writes: ['position'],
        })
    }
    individualBehaviour(e: {velocity: VelocityComponentState, position: PositionComponentState}) {
        return {
            position: {
                x: e.position.x + e.velocity.xspeed,
                y: e.position.y + e.velocity.yspeed,
            }
        }
    }
}