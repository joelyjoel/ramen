import { GameClient } from "./client-server-model/GameClient";
import { demoGame } from "./demo.game";


declare const io;

window.onload = function() {
    let socket = io();
 

    let canvas = document.createElement('canvas')
    document.body.appendChild(canvas);
   

    let gameClient = new GameClient({game: demoGame, socket, canvas});
    gameClient.start();
}