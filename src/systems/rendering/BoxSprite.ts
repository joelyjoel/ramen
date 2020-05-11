import { System } from "../system";
import { PositionComponentState } from "../game-mechanics/Position";
import { IOObject } from "../../Game";

export interface BoxSpriteComponentState {
    color: string;
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export const BoxSpriteSystem = new System({
    reads: ['position', 'boxSprite'],
    writes: [],

    individualBehaviour(e: {position: PositionComponentState, boxSprite:BoxSpriteComponentState}, io:IOObject) {
        if(io.ctx) {
            const ctx = io.ctx;
            const {top=0, left=0, right=0, bottom=0, color='#ff0000'} = e.boxSprite;
            const {x, y} = e.position;

            ctx.fillStyle = color;
            ctx.fillRect(
                x - left,
                y - top,
                left + right,
                top + bottom
            );

            return {}
        } else {
            throw 'BoxSprite system requires a rendering context.';
        }
    }
})