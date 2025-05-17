import express from "express";
import cors from "cors";
import dbconnect from "./db/databaseConnect.js";
import registerRoute from "./routes/student.route.js";
import wardernRoutes from "./routes/warden.route.js";
import gatekeeperRoutes from "./routes/gateKeeper.route.js"
// import cookie from 'cookie-parser'
import cookieParser from "cookie-parser";
// import router from "./routes/studentRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    // origin: '*',  //you can use this for all domains, but bruh its not safe , only use it for testing nahi to gya kaam se
    // origin: (origin, callback) => callback(null, true),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

app.use("/api", registerRoute)
app.use("/api/wardern", wardernRoutes)
app.use("/api/gatekeeper", gatekeeperRoutes)

// app.use(express.static(path.join(__dirname, "../frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
// });

dbconnect()
    .then(() => {
        app.on("error", (error) => {
            console.log(`Server is not talking: ${error}`);
            throw error;
        });

        app.listen(process.env.PORT || 4000, () => {
            console.log(`⚙️ Server running on port ${process.env.PORT || 4000}`);
        });
    })
    .catch((error) => {
        console.error(`Error from app.js:::-> ${error}`);
    });


// app.use("/user", router );




app.get("/", (req, res) => {
    res.send("hello Xet");
});