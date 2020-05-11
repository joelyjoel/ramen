import { EntityComponentSystem } from "./EntityComponentSystem";
import { System } from "./systems/system";
import { GameState } from "./GameState";


export interface DownKeys {
    [charCode:number]: boolean
}
export interface IOObject {
    game?: Game;
    ctx: CanvasRenderingContext2D;
    userInput: {
        downKeys: DownKeys;
    };
    /** The number of seconds elapsed since the previous frame */
    elapsed: number;
}

export interface GameConstructorOptions {
    canvas?: HTMLCanvasElement;
    systems: System[];
    initialState: GameState;
    frameRate?: number;
}

/** The game class handles the canvas on which the game is rendered and user input. */
export class Game {
    ecs: EntityComponentSystem;
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    frameRate: number;
    frameInterval: number;
    downKeys: DownKeys;
    tickTimer: NodeJS.Timeout;

    constructor(options: GameConstructorOptions) {
        let {
            canvas,
            systems,
            initialState,
            frameRate = 32
        } = options;

        if(canvas)
            this.adoptCanvas(canvas);
        
        this.ecs = new EntityComponentSystem({
            initialState,
            systems
        })

        this.frameRate = frameRate
        this.frameInterval = 1/this.frameRate

        this.downKeys = {};
    }

    start() {
        this.tickTimer = setInterval(() => this.tick(), 1000 / this.frameRate)
    }

    tick() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        let io:IOObject = {
            ctx: this.ctx,
            game: this,
            elapsed: this.frameInterval,
            userInput: {
                downKeys: this.downKeys,
            }
        };
        
        this.ecs.advanceState(io);
    }

    adoptCanvas(canvas:HTMLCanvasElement) {
        if(this.canvas)
            this.releaseCanvas();
            
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Add input listeners

        window.addEventListener('keydown', e => {
            e.preventDefault();

            this.downKeys[e.keyCode] = true;
        }, false)

        window.addEventListener('keyup', e => {
            e.preventDefault();

            this.downKeys[e.keyCode] = false;
        }, false)
    }

    releaseCanvas() {
        this.canvas = null;
        this.ctx = null

        // TODO: Remove event listeners
    }
}