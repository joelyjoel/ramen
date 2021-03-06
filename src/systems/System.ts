import { IOObject } from "../EntityComponentSystem";
import { getEntityGroupName, EntityUpdate, GameStateUpdate } from "../GamestateTracker";


export interface Group<entitystate> {
    [id: number]: entitystate;
}

export interface SystemConstructorOptions {
    reads: string[][];
    writes?: string[];
    spawns?:boolean;
    deletes?: boolean;
    spawnPrefix?: string
}

/** Base class for all systems */
export class System {
    readonly reads: string[][];
    readonly writes: string[];
    readonly spawns: boolean;
    readonly groupNames: string[];
    readonly deletes: boolean;
    spawnCounter: number;
    spawnPrefix: string;

    constructor(options:SystemConstructorOptions) {
        const {
            reads,
            writes = [],
            spawns = false,
            deletes = false,
            spawnPrefix = this.constructor.name.toLowerCase(),
        } = options

        this.reads = reads;
        this.writes = writes;
        this.spawns = spawns;
        this.deletes = deletes;

        this.spawnPrefix = spawnPrefix;
        this.spawnCounter = 0;

        this.groupNames = this.reads.map(components => getEntityGroupName(components));
    }

    behaviour(groups: Group<any>[], io:IOObject):GameStateUpdate {
        throw `Behaviour is not implemented for ${this.constructor.name}.`
    }

    generateNewEntityId() {
        return `${this.spawnPrefix}${this.spawnCounter++}`
    }

    initialise() {
        // Base class does nothing.
    }
}

export interface IntrospectiveSystemConstructorOptions {
    reads: string[];
    writes?: string[];
    deletes?: boolean;
}

/** Introspective systems modify one entity state at a time. */
export class IntrospectiveSystem<entitystate> extends System {

    constructor(options:IntrospectiveSystemConstructorOptions) {
        super({
            reads: [options.reads],
            writes: options.writes || [],
            deletes: options.deletes || false,
            spawns: false, // No introspective system can spawn new entities.
        })
    }

    behaviour(groups:Group<entitystate>[], io:IOObject):GameStateUpdate {
        // There should be just the one group
        let group = groups[0];

        let updates:GameStateUpdate = {}
        let n = 0;
        for(let id in group) {
            let e = group[id];
            let result = this.individualBehaviour(e, io);
            if(result === undefined)
                continue;
            else {
                updates[id] = result;
                ++n;
            }
        }

        if(n)
            return updates;
    }

    individualBehaviour(e:entitystate, io:IOObject):EntityUpdate|null|undefined {
        throw `Behaviour of introspective system is not defined.`
    }
}