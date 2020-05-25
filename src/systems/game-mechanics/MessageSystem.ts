import { System, Group } from "../system";
import { IOObject } from "../../EntityComponentSystem";
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
    behaviour([group]:[Group<{message: MessageComponentState, position:PositionComponentState}>], io:IOObject):GameStateUpdate {
        const newMessages = {}
        let n = 0;
        for(let id in group) {
            let e = group[id];
            const userInput = io.userInput[e.message.user];
            if(userInput.message) {
                // Create a new message
                let msgID = this.generateNewEntityId();
                newMessages[msgID] =  {
                    id: msgID,
                    label: {text: userInput.message},
                    position: {
                        x: e.position.x,
                        y: e.position.y,
                    },
                    velocity: {
                        xspeed: 0,
                        yspeed: -2,
                    },
                    timeOut: {timeRemaining: 10}
                }
                ++n
            }
        }

        if(n)
            return newMessages;
    }
}