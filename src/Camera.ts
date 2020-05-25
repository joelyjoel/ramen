import {compose, translate, scale} from 'transformation-matrix'
import { GameState } from './GameState';
import { IOObject } from './EntityComponentSystem';

export interface CameraConstructorOptions {
    x?: number;
    y?: number;
    scale?: number;
    canvasWidth,
    canvasHeight,
}

export interface ObjectMatrix {
    a: number;
    b:number;
    c:number;
    d: number;
    e: number;
    f:number;
}

export type ArrayMatrix = [
    number, number, number,
    number, number, number
]

export class Camera {
    x: number;
    y: number;
    scale: number;
    matrix: ObjectMatrix;

    track: string|null;
    trackingTightness: number;
    canvasWidth: number;
    canvasHeight: number;

    constructor(options:CameraConstructorOptions) {
        const {x=0, y=0, scale=1} = options;
        this.setCanvasDimensions(options.canvasWidth, options.canvasHeight)

        this.move(x, y, scale);


        this.trackingTightness = 0.8;
        this.track = null;
    }

    move(x, y, s=this.scale) {
        this.x = x;
        this.y = y;
        this.scale = s;

        this.matrix = compose(
            translate(this.canvasWidth/2, this.canvasHeight/2),
            scale(s),
            translate(- x,  - y),
        )
    }

    tick(gamestate:GameState, io:IOObject) {
        if(this.track) {
            console.log('tracking')
            let e = gamestate.entities[this.track];
            if(!e || !e.position)
                this.track = null;
            else
                this.move(
                    this.x + (e.position.x - this.x) * this.trackingTightness,
                    this.y + (e.position.y - this.y) * this.trackingTightness
                )
        }
    }

    get arrayMatrix() {
        return toArrayMatrix(this.matrix)
    }

    setCanvasDimensions(w:number, h:number) {
        this.canvasWidth = w;
        this.canvasHeight = h;
    }
}

export function toArrayMatrix(matrix:ObjectMatrix):ArrayMatrix {
    return [
        matrix.a,
        matrix.b,
        matrix.c,
        matrix.d,
        matrix.e,
        matrix.f,
    ]
}