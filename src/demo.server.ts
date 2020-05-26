import * as path from 'path';


// Create a web server
import * as express from 'express';
const app = express();
import {createServer} from 'http';
const http = createServer(app);

// Attach sockets
import * as socketio from 'socket.io';
import { demoGame } from './demo.game';
import { GameServer } from './client-server-model/GameServer';
const io = socketio(http);

app.use('/images', express.static(path.join(__dirname, 'images')))

// Serve the html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'demo.html'))
});

// Serve client js
app.get('/main.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.js'))
})

let gameServer = new GameServer({game: demoGame, socketio:io})
gameServer.start();


http.listen(3000, '0.0.0.0', () => {
    console.log('listening on *:3000');
});