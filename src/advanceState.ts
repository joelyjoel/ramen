import { GameState } from "./GameState";
import { System } from "./systems/system";
import { copyState, entityHasComponents, deepOverwrite } from "./util";



export function advanceState(state:GameState, systems:System[], io):GameState {
    let workingState:GameState = copyState(state);
    
    // Increment the frame number
    ++workingState.frame;

    // Loop through the systems,
    for(let system of systems) {
        // Find matches in the state
        let matches = Object.values(workingState.entities).filter(e => entityHasComponents(e, system.reads));

        // Apply behaviour to the matches
        if(system.individualBehaviour) {
            for(let e of matches) {
                let result = system.individualBehaviour(e, io);
                if(!system.observeOnly)
                    deepOverwrite(e, result );
            }
        } else if(system.behaviour) {
            let results = system.behaviour(matches, io);
            for(let i in results) {
                // check id's are consistent
                if(results[i].id != matches[i].id)
                    throw "Entity IDs are inconsistent.";

                deepOverwrite(matches[i], results[i]);
            }
        } else
            throw "System behaviour is undefined.";


        // let results = system.behaviour(matches);

    }

    return workingState;
}