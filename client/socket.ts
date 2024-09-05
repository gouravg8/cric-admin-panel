import { io } from 'socket.io-client';

const SERVER_URL = 'http://localhost:8000';

const socket = io(SERVER_URL, {
    autoConnect: false,
});

export default socket;
