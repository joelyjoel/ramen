import { GameDefinition } from "./GameDefinition";
import { EntityComponentSystem } from "../EntityComponentSystem";
import { UserInputReport, mergeUserInputReports, emptyUIReport } from "../UserInputReporter";

export interface GameServerConstructorOptions {
    game: GameDefinition;
    socketio: SocketIO.Server;
}

export interface GameServerPlayer {
    socker: SocketIO.Socket;
    playerIndex: number;
}

export class GameServer {
    ecs: EntityComponentSystem;
    uireports: UserInputReport[];
    frameRate: number;
    /** Duration of a frame in seconds. */
    frameInterval: number;
    socketio: SocketIO.Server;
    players: any;
    gameDefinition: GameDefinition;
    t: number;

    constructor({game, socketio}:GameServerConstructorOptions) {
        this.ecs = new EntityComponentSystem({
            initialState: game.initialState,
            systems: game.systems,
        })

        this.t = 0;

        this.gameDefinition = game

        this.frameRate = game.frameRate;
        this.frameInterval = 1/this.frameRate;

        this.socketio = socketio;
        this.socketio.on('connection', socket => {
            this.addPlayer(socket);
        })
        
        this.players = []

        this.uireports = []
    }

    addPlayer(socket:SocketIO.Socket) {
        let playerIndex = this.players.length;
        socket.on('uireport', (uireport:UserInputReport) => {
            // console.log(uireport)
            this.uireports[playerIndex] = mergeUserInputReports(this.uireports[playerIndex], uireport);
        })

        socket.emit('playerIndex', playerIndex)

        // Modify game state
        let addPlayerStateUpdate = this.gameDefinition.addPlayer(playerIndex, this.ecs.currentState);
        this.uireports.push(emptyUIReport())
        this.ecs.stateTracker.modifyState(addPlayerStateUpdate)
        socket.broadcast.emit('state update', addPlayerStateUpdate);
        socket.emit('initial state', this.ecs.currentState);

        socket.on('disconnect', () => {
            let removePlayerStateUpdate = this.gameDefinition.removePlayer(
                playerIndex, 
                this.ecs.currentState, 
                addPlayerStateUpdate
            );

            this.ecs.stateTracker.modifyState(removePlayerStateUpdate);
            socket.broadcast.emit('state update', removePlayerStateUpdate);
        })

        this.players.push({
            socket,
            playerIndex,
        })
    }

    tick() {
        this.t += this.frameInterval;
        let userInput = this.uireports;
        let stateUpdate = this.ecs.advanceState({
            elapsed: this.frameInterval,
            userInput,
            t: this.t,
        })
        this.socketio.emit('state update', stateUpdate);
        this.clearUIReports();
    }

    async start() {
        await this.ecs.systemPromises
        setInterval(() => this.tick(), this.frameInterval * 1000)

        // setInterval(() => {
        //     console.clear();
        //     console.log(this.ecs.currentState.entities);
        // }, 250)
    }

    clearUIReports() {
        this.uireports = this.uireports.map(() => emptyUIReport());
    }
}