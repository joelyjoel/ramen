import { System } from "../systems/system";
import { RenderSystem } from "../systems/rendering/RenderSystem";
import { GameState } from "../GameState";
import { GameStateUpdate } from "../GamestateTracker";

export interface GameDefinition {
    /** The systems that define the game mechanics. */
    systems: System[];

    renderSystems: RenderSystem[];

    initialState: GameState;

    frameRate: number;

    addPlayer: (playerIndex:number, state:GameState) => GameStateUpdate;
    removePlayer: (playerIndex: number, state:GameState, addPlayerUpdate: GameStateUpdate) => GameStateUpdate;
}