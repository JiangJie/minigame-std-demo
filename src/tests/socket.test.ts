import { connectSocket } from 'minigame-std';

const data = 'minigame-std';

const socket = connectSocket('wss://echo.websocket.org/');

let count = 0;
socket.addEventListener('message', (msg) => {
    count += 1;

    if (count === 1) {
        console.assert((msg as string).startsWith('Request served by'));
    } else if (count === 2) {
        console.assert(msg === data);
        socket.close();
    }
});

socket.addEventListener('error', (err) => {
    console.log('socket error', err);
});

socket.addEventListener('close', (code) => {
    console.assert(code === 1005);
});

socket.addEventListener('open', () => {
    socket.send(data);
});