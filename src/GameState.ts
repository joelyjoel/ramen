import { ComponentState } from "./EntityComponentSystem";

export interface GameState {
    frame: number;
    entities: {[id:string]: Entity};
}

export interface Entity {
    id: number;
    [componentName: string]: ComponentState;
}