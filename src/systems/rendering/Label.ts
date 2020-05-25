import { System, IntrospectiveSystem } from "../system";
import { PositionComponentState } from "../game-mechanics/Position";
import { ComponentState } from "../../EntityComponentSystem";
import { IOObject } from "../../EntityComponentSystem";
import { RenderSystem } from "./RenderSystem";
import { toArrayMatrix } from "../../Camera";
import {compose, translate} from 'transformation-matrix'

export interface LabelComponentState extends ComponentState {
    text: string;
    xOffset?:number;
    yOffset?:number;
    maxWidth: number | undefined;
}



export interface LabelSystemEntityState {
    id: number;
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
        const x = e.position.x + (e.label.xOffset || 0);
        const y = e.position.y + (e.label.yOffset || 0);

        const matrix = compose(
            this.renderer.camera.matrix,
            translate(x, y)
        )

        const ctx = this.renderer.ctx;
        ctx.setTransform(...toArrayMatrix(matrix))
        ctx.strokeText(e.label.text, 0, 0, e.label.maxWidth)

        return undefined;
    }
}