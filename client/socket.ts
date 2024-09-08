import { io } from 'socket.io-client';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const socket = io(SERVER_URL!, {
    autoConnect: false,
});
export default socket;
