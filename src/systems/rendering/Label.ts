import { System, IntrospectiveSystem } from "../system";
import { PositionComponentState } from "../game-mechanics/Position";
import { ComponentState } from "../../EntityComponentSystem";
import { IOObject } from "../../Game";

export interface LabelComponentState extends ComponentState {
    text: string;
    xOffset?:number;
    yOffset?:number;
    maxWidth: number | undefined;
}

// export const LabelSystem = new System({
//     reads: ['position', 'label'],

//     individualBehaviour(e:{position:PositionComponentState, label:LabelComponentState}, io) {
//         if(!io.ctx)
//             throw "Label system expects a rendering context."
//         let x = e.position.x + (e.label.xOffset || 0);
//         let y = e.position.y + (e.label.yOffset || 0);

//         io.ctx.strokeText(e.label.text, x, y, e.label.maxWidth)

//         return {}
//     }
// })

export interface LabelSystemEntityState {
    label:LabelComponentState, 
    position:PositionComponentState
}

/** @deprecated */
export class LabelSystem extends IntrospectiveSystem<LabelSystemEntityState> {
    constructor() {
        super({
            reads: ['label', 'position'],
        })
    }

    individualBehaviour(e:LabelSystemEntityState, io:IOObject) {
        if(!io.ctx)
            throw "Label system expects a rendering context."

        let x = e.position.x + (e.label.xOffset || 0);
        let y = e.position.y + (e.label.yOffset || 0);

        io.ctx.strokeText(e.label.text, x, y, e.label.maxWidth)

        return undefined;
    }
}