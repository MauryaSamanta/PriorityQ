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
import fileRoute from "./routes/file.js";
import tagRoute from "./routes/tag.js";
import Message from "./models/Message.js";
import { v2 as cloudinary } from "cloudinary";
import { attachmentsMulter } from "./middlewares/multer.js";
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
app.use("/file",fileRoute);
app.use("/tag",tagRoute);
// app.use("/api/v1/chat", chatRoute);
// app.use("/api/v1/admin", adminRoute);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
  socket.on('joinZone', (zone) => {
    socket.join(zone);
    //console.log(`User ${socket.id} joined zone ${zone}`);
  });

  // socket.on('sendMessage', (message) => {
  //   io.emit('receiveMessage', message);
  // });

  socket.on('sendMessage',async(message) => {
    //const { zone, message } = data;
    //const file=req.file;
    io.to(message.zone).emit('receiveMessage', message);
    const hashtagRegex = /#\w+/g;
    const hashtags = message.text.match(hashtagRegex);

    
    let messageforDB={
      text:message.text,
      senderAvatar:message.senderAvatar,
      senderName:message.senderName,
      file:'',
      sender_id:message.sender_id,
      zone_id:message.zone,
      qube_id:message.qube
    }
    if(hashtags){
      messageforDB={...messageforDB,tags:hashtags[0]};
    }

    const newMessage=new Message(messageforDB);
    const savednewMessage=await newMessage.save();
    
   }
    
    //console.log(`Message sent to zone ${message.zone}: ${message}`);
  );

});


server.listen(3001,()=>{//started node server
    console.log("Server is up");
})