import { System, IntrospectiveSystem } from "../system";
import { PositionComponentState } from "../game-mechanics/Position";
import { ComponentState } from "../../EntityComponentSystem";
import { IOObject } from "../../EntityComponentSystem";
import { RenderSystem } from "./RenderSystem";

export interface LabelComponentState extends ComponentState {
    text: string;
    xOffset?:number;
    yOffset?:number;
    maxWidth: number | undefined;
}



export interface LabelSystemEntityState {
    label:LabelComponentState, 
    position:PositionComponentState
}

/** @deprecated */
export class LabelSystem extends RenderSystem<LabelSystemEntityState> {
    constructor() {
        super({
            reads: ['label', 'position'],
        })
    }

    individualBehaviour(e:LabelSystemEntityState, io:IOObject) {

        let x = e.position.x + (e.label.xOffset || 0);
        let y = e.position.y + (e.label.yOffset || 0);

        this.renderer.ctx.strokeText(e.label.text, x, y, e.label.maxWidth)

        return undefined;
    }
}