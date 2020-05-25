import { LocalGame } from "../LocalGame";
import { demoGame } from "../demo.game";


window.onload = function() {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas)
    
    const engine = new LocalGame({
        game: demoGame,
        canvas,
    });

    engine.start();

    console.log(engine.ecs.currentState)

    let ecsStateMonitor = document.createElement('pre');
    let rendererStateMonitor = document.createElement('pre')
    document.body.appendChild(ecsStateMonitor);
    document.body.appendChild(rendererStateMonitor);

    setInterval(() => {
        ecsStateMonitor.innerText = JSON.stringify(engine.ecs.currentState, null, 4);
        rendererStateMonitor.innerText = JSON.stringify(engine.renderer.currentState, null, 4)
    }, 250)
}