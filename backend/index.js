import express from "express";
import cors from "cors";
import dbconnect from "./db/databaseConnect.js";
import registerRoute from "./routes/student.route.js";
import wardernRoutes from "./routes/warden.route.js";
import gatekeeperRoutes from "./routes/gateKeeper.route.js"
// import cookie from 'cookie-parser'
import cookieParser from "cookie-parser";
// import router from "./routes/studentRoutes.js";

import { Server } from 'socket.io';
import { createServer } from 'http';
// import socket from "./socket.js";

import path from "path";
import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();

const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["https://srxit.netlify.app","http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true,
    },
})

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    socket.emit("welcome_student", { msg: "Welcome!", id: socket.id });
    socket.emit("welcome_warden", { msg: "Welcome Warden!", id: socket.id });
    socket.emit("welcome_gatekeeper", { msg: "Welcome Gatekeeper!", id: socket.id });

    socket.on("sendRequestSOCKET", (data) => {
        console.log(data)
        socket.broadcast.emit("sendRequestSOCKET", data)
    })

    socket.on("DeclineStudentSOCKET", (data) => {
        console.log(data)
        socket.broadcast.emit("DeclineStudentSOCKET", data)
    })

    socket.on("AccepctStudentSOCKET", (data) => {
        console.log(data)
        socket.broadcast.emit("AccepctStudentSOCKET", data)
    })

// function handleOutsideFromGatekeeperSOCKET(socket, data) {
//     socket.off("OutsideFromGatekeeperSOCKET");
//     socket.broadcast.emit("OutsideFromGatekeeperSOCKET", data);
//     console.log("OutsideFromGatekeeperSOCKET event emitted");
// }


    // socket.on("OutsideFromGatekeeperSOCKET", (data) => {
    //     console.log(data)
    //     socket.off("OutsideFromGatekeeperSOCKET")
    // })
    // socket.emit("OutsideFromGatekeeperSOCKET", { status: 200, message: "The student is outside from now" })
});

const PermissionFromGatekeeperSOCKET = (data) => {
    // io.off("PermissionFromGatekeeperSOCKET")
    io.emit("PermissionFromGatekeeperSOCKET", data)
    console.log("PermissionFromGatekeeperSOCKET event emitted");
}



app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: ["https://srxit.netlify.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

app.use("/api", registerRoute)
app.use("/api/wardern", wardernRoutes)
app.use("/api/gatekeeper", gatekeeperRoutes)

dbconnect()
    .then(() => {
        app.on("error", (error) => {
            console.log(`Server is not talking: ${error}`);
            throw error;
        });
        server.listen(process.env.PORT || 4000, () => {
            console.log(`⚙️ Server running on port ${process.env.PORT || 4000}`);
        });
    })
    .catch((error) => {
        console.error(`Error from app.js:::-> ${error}`);
    });

app.get("/", (req, res) => {
    res.send("hello Xetttt");
});


export { PermissionFromGatekeeperSOCKET }
