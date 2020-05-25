import { GameClient } from "./client-server-model/GameClient";
import { demoGame } from "./demo.game";


declare const io;

window.onload = function() {
    let socket = io();
 

    let canvas = document.createElement('canvas')
    document.body.appendChild(canvas);

    let stateMonitor = document.createElement('pre')
    document.body.appendChild(stateMonitor)

    let gameClient = new GameClient({game: demoGame, socket, canvas});
    gameClient.start();
    setInterval(() => {
        stateMonitor.innerText = JSON.stringify(gameClient.renderer.currentState, null, 4)
    }, 250)
}