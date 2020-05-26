import { GameDefinition } from "./client-server-model/GameDefinition";
import { GravitySystem } from "./systems/game-mechanics/Gravity";
import { VelocitySystem } from "./systems/game-mechanics/Velocity";
import { BouncyFloorSystem } from "./systems/game-mechanics/BouncyFloor";
import { LeftRightControlSystem } from "./systems/game-mechanics/LeftRightControl";
import { MessageSystem } from "./systems/game-mechanics/MessageSystem";
import { FrictionSystem } from "./systems/game-mechanics/Friction";
import { TimeOutSystem } from "./systems/game-mechanics/TimeOut";
// import { BoxSpriteSystem } from "./systems/rendering/BoxSprite";
import { LabelSystem } from "./systems/rendering/Label";
import { SpriteSystem } from "./systems/rendering/SpriteSystem";

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
        new SpriteSystem()
            .addGridSprite({
                url: 'images/LegAppleMan.png',
                cellWidth: 32,
                cellHeight: 32,
                numberOfColumns: 7,
                mappings: {
                    'idle': [0],
                    'walk': [42, 43, 44, 45]
                },
                frameRate: 12
            }),
        new LabelSystem,

    ],

    initialState: {
        frame: 0,
        entities: {
            
        }
    },

    addPlayer: (playerIndex, state) => {
        let id = `player${playerIndex}`
        return {
            [id]: {
                id,
                position: {y: 0, x: 0},
                velocity: {xspeed: 0, yspeed: 0},

                label: {text: `Player ${playerIndex}`},
                sprite: {sprite: 'walk', speed:1/2},

                leftRightControl: {acceleration: 10, user: playerIndex},
                message: {user: playerIndex}
            }
        }
    },

    removePlayer(playerIndex, state, addPlayerStateUpdate) {
        return {
            [`player${playerIndex}`]: {
                timeOut: {timeRemaining: 5},
                velocity: {yspeed: -3}
            },
        }
    }
}