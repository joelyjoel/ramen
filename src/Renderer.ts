import { EntityComponentSystem } from "./EntityComponentSystem";
import { GameStateUpdate } from "./GamestateTracker";
import { GameState } from "./GameState";
import { RenderSystem } from "./systems/rendering/RenderSystem";
import { IOObject } from "./EntityComponentSystem";

export interface RendererConstructorOptions {
    canvas?: HTMLCanvasElement;
    systems: RenderSystem<any>[];
    initialState: GameState;
}

export class Renderer extends EntityComponentSystem {
    camera: {x:number, y:number};
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor({canvas, systems, initialState}:RendererConstructorOptions) {
        for(let system of systems)
            if(!(system instanceof RenderSystem) )
                throw new Error("All systems in the renederer must be RenderSystem instances.");

        super({initialState, systems})


        if(canvas)
            this.adoptCanvas(canvas);

        // Claim the systems
        for(let system of systems)
            system.renderer = this;
    }

    adoptCanvas(canvas:HTMLCanvasElement) {
        if(this.canvas)
            throw new Error("Renderer already has a <canvas> element");
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')
    }

    renderUpdate(update:GameStateUpdate, io:IOObject) {
        this.stateTracker.modifyState(update);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.cycleSystems(io);
    }

    renderState(state:GameState, io:IOObject) {
        this.stateTracker.setState(state);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.cycleSystems(io);
    }

    /** Psuedo-concurrently run all systems without modifying state. */
    cycleSystems(io:IOObject) {
        // Loop through the systems,
        for(let system of this.systems) {
            // Select groups
            let groups = system.groupNames.map(
                groupName => this.stateTracker.fetchGroupState(groupName)
            )

            // Apply behaviour to the matches
            let groupUpdate = system.behaviour(groups, io);
            // if(groupUpdate)
            //     throw new Error('Renderer systems should not return state updates.')
        }
    }
}