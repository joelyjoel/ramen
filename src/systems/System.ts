import { IOObject } from "../Game";
import { ComponentState } from "../EntityComponentSystem";
import { getEntityGroupName, EntityUpdate } from "../GamestateTracker";

export interface GlobalBehaviourResult {
    modify: {
        [id: number]: EntityUpdate,
    },
    create: {}
}
export type GlobalBehaviour = (matches: {id: number, [componentName: string]: ComponentState}[], io:IOObject) => {id: number, [componentName: string]: ComponentState}[]
export type IndividualBehaviour = (match: {[componentName: string]: ComponentState}, io:IOObject) => {[componentName: string]: ComponentState}


export interface SystemConstructorOptions {
    reads: string[];
    writes?: string[];
    behaviour?:GlobalBehaviour | null;
    individualBehaviour:IndividualBehaviour | null;
}
export class System {
    reads: string[];
    writes: string[];

    /** Observe-only systems do not effect the game state. For example, a sprite rendering component. */
    observeOnly?: boolean;
    behaviour?: GlobalBehaviour;
    individualBehaviour?: IndividualBehaviour;
    groupName: string;

    constructor(options: SystemConstructorOptions) {
        const {
            reads, 
            writes = [], 
            behaviour = null, 
            individualBehaviour = null
        } = options;

        // TODO: Change back to just one field: components
        this.reads = reads;
        this.writes = writes;

        this.groupName = getEntityGroupName(this.reads)

        this.behaviour = behaviour;
        this.individualBehaviour = individualBehaviour;
    }
}