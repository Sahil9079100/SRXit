import { io } from "socket.io-client";

const socket = io(`${process.env.SOCKET_CLIENT_URI}`, {
    withCredentials: true,
});

// export default ;