import { GameDefinition } from "./GameDefinition";
import { Renderer } from "../Renderer";
import { UserInputReporter } from "../UserInputReporter";
import { GameStateUpdate } from "../GamestateTracker";
import { GameState } from "../GameState";

export interface GameClientConstructorOptions {
    game: GameDefinition;
    canvas: HTMLCanvasElement;
    socket:SocketIO.Socket;
}

export class GameClient {
    renderer: Renderer;
    uiReporter: UserInputReporter;
    frameRate: number;
    socket: SocketIO.Socket;
    frameInterval: number;
    playerIndex: number;;

    constructor({game, canvas, socket}:GameClientConstructorOptions) {
        this.renderer = new Renderer({
            canvas, 
            systems: game.renderSystems,
            initialState: game.initialState
        })

        this.uiReporter = new UserInputReporter;
        this.uiReporter.adoptCanvas(canvas);

        this.frameRate = game.frameRate;
        this.frameInterval = 1/this.frameRate
        this.socket = socket;

        let userInput = [];
        userInput[this.playerIndex] = this.uiReporter.previewReport();

        let t = 0;
        this.socket.on('state update', (update:GameStateUpdate) => {
            t += this.frameInterval;
            this.renderer.renderUpdate(update, {
                elapsed: this.frameInterval,
                userInput,
                t: t,
            });
        })

        this.socket.on('initial state', (state: GameState) => {
            t = 0;
            this.renderer.renderState(state, {
                elapsed: this.frameInterval,
                userInput,
                t,
            })
        })

        this.socket.on('playerIndex', i => {
            this.playerIndex = i;
        })
    }

    sendUIReport() {
        let report = this.uiReporter.getReport();
        this.socket.emit('uireport', report)
    }

    async start() {
        await this.renderer.systemPromises;
        setInterval(() => this.sendUIReport(), 1000 * this.frameInterval);
    }
}