import { EntityComponentSystem } from "./EntityComponentSystem";
import { System } from "./systems/system";
import { GameState } from "./GameState";
import { UserInputReporter, UserInputReport } from "./UserInputReporter";
import { Renderer } from "./Renderer";
import { RenderSystem } from "./systems/rendering/RenderSystem";

export interface IOObject {
    game?: Game;
    userInput: UserInputReport
    /** The number of seconds elapsed since the previous frame */
    elapsed: number;
}

export interface GameConstructorOptions {
    canvas?: HTMLCanvasElement;
    systems: System[];
    renderSystems: RenderSystem<any>[];
    initialState: GameState;
    frameRate?: number;
}

/** The game class handles the canvas on which the game is rendered and user input. */
export class Game {
    ecs: EntityComponentSystem;
    canvas: HTMLCanvasElement | null;
    frameRate: number;
    frameInterval: number;
    tickTimer: NodeJS.Timeout;
    efficiencyMessage: string;
    onenterframe: () => void;
    uireporter: UserInputReporter;
    renderer: Renderer;

    constructor(options: GameConstructorOptions) {
        let {
            canvas,
            systems,
            renderSystems,
            initialState,
            frameRate = 32
        } = options;

        this.uireporter = new UserInputReporter

        this.renderer = new Renderer({canvas, systems:renderSystems, initialState})

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
        if(this.onenterframe)
            this.onenterframe();

        let io:IOObject = {
            game: this,
            elapsed: this.frameInterval,
            userInput: this.uireporter.getReport(),
        };
        
        let stateUpdate = this.ecs.advanceState(io);

        this.renderer.renderUpdate(stateUpdate, io);
    }

    adoptCanvas(canvas:HTMLCanvasElement) {
        if(this.canvas)
            throw new Error('Game already has a canvas element.');
            
        this.canvas = canvas;

        this.renderer.adoptCanvas(canvas);
        this.uireporter.adoptCanvas(canvas);
    }
}