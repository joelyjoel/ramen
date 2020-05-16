import { System, Group } from "../system";
import { IOObject } from "../../Game";
import { PositionComponentState } from "./Position";
import { GameStateUpdate } from "../../GamestateTracker";

export interface MessageComponentState {
    user: number;
}

export class MessageSystem extends System {
    constructor() {
        super({
            reads: [['message', 'position']],
            spawns: true,
        })
    }
    behaviour(groups:[Group<{message: MessageComponentState, position:PositionComponentState}>], io:IOObject):GameStateUpdate {
        let group = groups[0];
        const message = io.userInput.message
        if(message) {
            for(let id in group) {
                let e = group[id];
                if(e.message.user == 0) {
                    // Create a new message
                    return {
                        create: [{
                            label: {text: message},
                            position: {
                                x: e.position.x,
                                y: e.position.y,
                            },
                            velocity: {
                                xspeed: 0,
                                yspeed: -2,
                            },
                            timeOut: {timeRemaining: 10}
                        }]
                    }
                }
            }
        }
        return {}
    }
}