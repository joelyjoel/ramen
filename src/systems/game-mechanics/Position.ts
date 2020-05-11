import { ComponentState } from "../../EntityComponentSystem";

export interface PositionComponentState extends ComponentState {
    x: number;
    y: number;
}