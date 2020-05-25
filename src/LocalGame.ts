import { GameDefinition } from "./client-server-model/GameDefinition";
import { Renderer } from "./Renderer";
import { UserInputReporter, emptyUIReport } from "./UserInputReporter";
import { EntityComponentSystem } from "./EntityComponentSystem";

export interface LocalGameConstructorOptions {
    game: GameDefinition;
    canvas: HTMLCanvasElement;
}

/** Play locally without the network. */
export class LocalGame {
    renderer: Renderer;
    uiReporter: UserInputReporter;
    ecs: EntityComponentSystem;
    frameRate: number;
    frameInterval: number;
    gameDefinition: GameDefinition;

    constructor({game, canvas}: LocalGameConstructorOptions) {
        const {
            systems,
            initialState,
            renderSystems
        } = game;

        this.gameDefinition = game;


        this.uiReporter = new UserInputReporter;
        this.uiReporter.adoptCanvas(canvas);

        this.frameRate = game.frameRate;
        this.frameInterval = 1/this.frameRate;

        this.ecs = new EntityComponentSystem({
            initialState,
            systems,
        })

        if(game.addPlayer) {
            let addPlayerStateUpdate = game.addPlayer(0, this.ecs.currentState);
            this.ecs.stateTracker.modifyState(addPlayerStateUpdate);
        }

        this.renderer = new Renderer({
            canvas, systems:renderSystems, 
            initialState: this.ecs.currentState
        })
    }

    tick() {
        // Get ui report
        let userInput = this.uiReporter.getReport();
        let io = {
            elapsed: this.frameInterval,
            userInput: [userInput],
        }
        
        // Advance state
        let stateUpdate = this.ecs.advanceState(io);
        
        try {
            // render updates
            this.renderer.renderUpdate(stateUpdate, io);
        } catch(e) {
            console.log('ecs state:', this.ecs.currentState)
            console.log('render state:', this.renderer.currentState)
            // @ts-ignore
            console.log('previous state update:', this.previousStateUpdate)
            throw e
        }

        // @ts-ignore
        this.previousStateUpdate = stateUpdate
    }

    start() {
        setInterval(() => this.tick(), 1000 * this.frameInterval)
        console.log(this.renderer.stateTracker.groups)
    }
}