import { Game } from "./Game";
import { BoxSpriteSystem } from "./systems/index";
import { GravitySystem } from "./systems/game-mechanics/Gravity";
import { VelocitySystem } from "./systems/game-mechanics/Velocity";
import { LabelSystem } from "./systems/rendering/Label";
import { BouncyFloorSystem } from "./systems/game-mechanics/BouncyFloor";
import { LeftRightControlSystem } from "./systems/game-mechanics/LeftRightControl";
import { FrictionSystem } from "./systems/game-mechanics/Friction";


let myGame = new Game({
    systems: [
        GravitySystem,
        VelocitySystem,
        BouncyFloorSystem,
        BoxSpriteSystem,
        LabelSystem,
        LeftRightControlSystem,
        FrictionSystem,
    ],
    initialState: {
        frame: 0,
        entities: {
            0: {
                id: 0,
                // boxSprite: {
                //     top: 10,
                //     left:2,
                //     right: 2,
                // },
                position: {x:25, y:25},
                gravity: {g: 98.1},
                velocity: {xspeed:0, yspeed: 0},
                label: {text:'Joel'},
                bouncyFloor: {y: 100, bounce: 0},
                leftRightControl: {acceleration: 100},
                friction: {friction: 0.95},
            }
        }
    }
})

window.onload = function() {
    let canvas = document.createElement('canvas')
    document.body.appendChild(canvas);

    myGame.adoptCanvas(canvas)

    myGame.start()
}