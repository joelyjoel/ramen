import { Game } from "./Game";
import { VelocitySystem } from "./systems/game-mechanics/Velocity";
import { LabelSystem } from "./systems/rendering/Label";
import { BoxSpriteSystem } from "./systems/index";
import { LeftRightControlSystem } from "./systems/game-mechanics/LeftRightControl";
import { BouncyFloorSystem } from "./systems/game-mechanics/BouncyFloor";
import { GravitySystem } from "./systems/game-mechanics/Gravity";
import { MessageSystem } from "./systems/game-mechanics/MessageSystem";
import { TimeOutSystem } from "./systems/game-mechanics/TimeOut";
import { FrictionSystem } from "./systems/game-mechanics/Friction";


let myGame = new Game({
    systems: [
        new GravitySystem,
        new VelocitySystem,
        new BouncyFloorSystem({y: 200}),
        new BoxSpriteSystem,
        new LabelSystem,
        new LeftRightControlSystem,
        new MessageSystem,
        new FrictionSystem,
        new TimeOutSystem,
    ],
    initialState: {
        frame: 0,
        entities: {
            0: {
                id: 0,
                // boxSprite: {
                //     top: 100,
                //     left:20,
                //     right: 20,
                // },
                position: {x:25, y:125},
                leftRightControl: {acceleration: 10},

                velocity: {xspeed:0, yspeed: 0},
                label: {text:'Joel'},
                // bouncyFloor: {},
                // gravity: {},
                message: {user: 0},
                friction: {friction: 0.99}
            },
        }
    }
})

window.onload = function() {
    let canvas = document.createElement('canvas')
    document.body.appendChild(canvas);
    myGame.adoptCanvas(canvas)

    let stateView = document.createElement('pre')
    document.body.appendChild(stateView);
    myGame.onenterframe = function() {
        stateView.innerText = JSON.stringify(this.ecs.stateTracker.state, undefined, 4) + '\n' + myGame.efficiencyMessage;
    }

    myGame.start();
}