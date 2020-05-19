import { GameDefinition } from "./client-server-model/GameDefinition";
import { GravitySystem } from "./systems/game-mechanics/Gravity";
import { VelocitySystem } from "./systems/game-mechanics/Velocity";
import { BouncyFloorSystem } from "./systems/game-mechanics/BouncyFloor";
import { LeftRightControlSystem } from "./systems/game-mechanics/LeftRightControl";
import { MessageSystem } from "./systems/game-mechanics/MessageSystem";
import { FrictionSystem } from "./systems/game-mechanics/Friction";
import { TimeOutSystem } from "./systems/game-mechanics/TimeOut";
import { BoxSpriteSystem } from "./systems/rendering/BoxSprite";
import { LabelSystem } from "./systems/rendering/Label";

export const demoGame:GameDefinition = {
    frameRate: 32,

    systems: [
        new GravitySystem,
        new VelocitySystem,
        new BouncyFloorSystem({y: 200}),
        new LeftRightControlSystem,
        new MessageSystem,
        new FrictionSystem,
        new TimeOutSystem,
    ],

    renderSystems: [
        new BoxSpriteSystem,
        new LabelSystem,
    ],

    initialState: {
        frame: 0,
        entities: {
            
        }
    },

    addPlayer: (playerIndex, state) => {
        return {
            create: [
                {
                    position: {y: 100, x: 50 * playerIndex},
                    velocity: {xspeed: 0, yspeed: 0},
                    label: {text: `Player ${playerIndex}`},
                    leftRightControl: {acceleration: 10, user: playerIndex}
                }
            ]
        }
    }
}