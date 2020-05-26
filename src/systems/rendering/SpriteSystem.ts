import { RenderSystem } from "./RenderSystem";
import {compose, translate} from 'transformation-matrix'
import { IOObject } from "../../EntityComponentSystem";
import { PositionComponentState } from "../game-mechanics/Position";
import { toArrayMatrix } from "../../Camera";

export interface SpriteComponentState {
    sprite: string;
    offset?: number;
    speed?: number;
}

export interface SpriteCache {
    [sprite_id: string]: Sprite;
}

export interface SpriteFrame {
    img: ImageBitmap;
    duration: number;
}

export interface Sprite {
    frames: SpriteFrame[];
    duration: number;
}

export interface SpriteFramePlan {
    src: string;
    x: number;
    y: number;
    w: number;
    h: number;
    duration: number;
}

type readstate = {sprite: SpriteComponentState; position: PositionComponentState};
export class SpriteSystem extends RenderSystem<readstate> {
    cache: SpriteCache;
    plans: {
        [sprite_id: string]: SpriteFramePlan[];
    };

    constructor() {
        super({reads: ['position', 'sprite']});
        this.plans = {}
        this.cache = {}
    }

    async initialise() {
        // Load all the sprites into memory
        let imageCache = {};
        let promises = []

        for(let sprite_id in this.plans) {
            let duration = 0;
            for(let frameplan of this.plans[sprite_id])
                duration += frameplan.duration;

            this.cache[sprite_id] = {
                frames: [],
                duration,
            };
            for(const frame in this.plans[sprite_id]) {
                const plan = this.plans[sprite_id][frame];
                const {src, x, y, w, h} = plan;

                if(!imageCache[src]) {
                    let img = new Image;
                    let promise = new Promise((res, rej) => {
                        img.onload = () => res(img);
                        img.onerror = rej;
                        img.src = src;
                    })
                    imageCache[src] = promise;
                }

                let framePromise = imageCache[src].then(async (img) => {
                    let bitmap = await createImageBitmap(img, x, y, w, h)
                    let spriteFrame = {
                        img: bitmap,
                        duration: plan.duration,
                    }
                    this.cache[sprite_id].frames[frame] = spriteFrame
                    return spriteFrame;
                })

                promises.push(framePromise)
            }
        }

        await Promise.all(promises);
    }

    addGridSprite(options:{
        url: string;
        cellWidth: number;
        cellHeight: number;
        numberOfColumns: number;
        mappings: {
            [sprite_id:string]: number[];
        },
        frameRate?: number;
    }) {
        const {
            url, cellWidth, cellHeight, numberOfColumns, mappings,
            frameRate = 12,
        } = options

        for(let sprite_id in mappings) {
            this.plans[sprite_id] = mappings[sprite_id].map(n => {
                let row = Math.floor(n / numberOfColumns);
                let col = n % numberOfColumns;
                return {
                    src: url,
                    x: col * cellWidth,
                    w: cellWidth,
                    y: row * cellHeight,
                    h: cellHeight,
                    duration: 1 / frameRate,
                }
            })
        }

        return this;
    }

    individualBehaviour(e:readstate, io:IOObject) {
        const {
            offset = 0,
            speed = 1
        } = e.sprite
        const sprite = this.cache[e.sprite.sprite]
        let t = ((io.t - offset) * speed) % sprite.duration;
        let i;
        for(i=0; i<sprite.frames.length; ++i) {
            if(sprite.frames[i].duration > t)
                break;
            else
                t -= sprite.frames[i].duration
        }

        const frame = sprite.frames[i];


        const {x, y} = e.position;

        const matrix = compose(
            this.renderer.camera.matrix,
            translate(x, y),
        )

        const ctx = this.renderer.ctx;
        ctx.setTransform(...toArrayMatrix(matrix));
        ctx.drawImage(frame.img,0,0)
        
        return undefined;
    }
}