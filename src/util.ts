import { Entity, GameState } from "./GameState";

/** Merge two objects on a recursive, deep level. 
 * 
 * Note: This function is non-functional, it modifies the `original` argument.
 */
export function deepAssign(original:any, updates:any) {
    if(typeof original === 'object' && typeof updates === 'object') {
        for(let key in updates) {
            original[key] = deepAssign(original[key], updates[key]);
        }
        return original;
    } else
        return updates;
}

export function copyState(state) {
    return JSON.parse(JSON.stringify(state));
}

export function entityHasComponents(e:Entity, components:string[]) {
    return components.every(c => e[c] != undefined)
}

export function cloneGameState(state:GameState):GameState {
    return JSON.parse(JSON.stringify(state));
}