import express from "express";
import connectDB from "./ExternalConnections/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import socketConfig from './socket.js';
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import hubRoute from "./routes/hub.js";
import qubeRoute from "./routes/qube.js";
import zoneRoute from "./routes/zone.js";
import messageRoute from "./routes/message.js";
import inviteRoute from "./routes/invites.js";
const app=express();
const server = http.createServer(app);
const io = socketConfig(server);
dotenv.config();



connectDB(process.env.MONGO_URI);  // connected to mongodb

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//apis
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/hub",hubRoute);
app.use("/qube",qubeRoute);
app.use((req, res, next) => {
    req.io = io;
    next();
  });
app.use("/zone", zoneRoute);
app.use("/message",messageRoute);
app.use("/invite",inviteRoute);
// app.use("/api/v1/chat", chatRoute);
// app.use("/api/v1/admin", adminRoute);



server.listen(3001,()=>{//started node server
    console.log("Server is up");
})