import { EntityComponentSystem } from "./EntityComponentSystem";
import { System } from "./systems/system";
import { GameState } from "./GameState";
import { UserInputReporter, UserInputReport } from "./UserInputReporter";

export interface IOObject {
    game?: Game;
    ctx: CanvasRenderingContext2D;
    userInput: UserInputReport
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
    tickTimer: NodeJS.Timeout;
    efficiencyMessage: string;
    onenterframe: () => void;
    uireporter: UserInputReporter;

    constructor(options: GameConstructorOptions) {
        let {
            canvas,
            systems,
            initialState,
            frameRate = 32
        } = options;

        this.uireporter = new UserInputReporter

        if(canvas)
            this.adoptCanvas(canvas);
        
        this.ecs = new EntityComponentSystem({
            initialState,
            systems
        })

        this.frameRate = frameRate
        this.frameInterval = 1/this.frameRate

    }

    start() {
        this.tickTimer = setInterval(() => this.tick(), 1000 / this.frameRate)
    }

    tick() {
        const tsStart = Date.now()
        if(this.onenterframe)
            this.onenterframe();

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        let io:IOObject = {
            ctx: this.ctx,
            game: this,
            elapsed: this.frameInterval,
            userInput: this.uireporter.getReport(),
        };
        
        this.ecs.advanceState(io);

        let tsEnd = Date.now();

        this.efficiencyMessage = `${tsEnd-tsStart} / ${this.frameInterval * 1000}ms`
    }

    adoptCanvas(canvas:HTMLCanvasElement) {
        if(this.canvas)
            this.releaseCanvas();
            
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.uireporter.adoptCanvas(canvas);
    }

    releaseCanvas() {
        this.canvas = null;
        this.ctx = null

        this.uireporter.releaseCanvas();
    }
}