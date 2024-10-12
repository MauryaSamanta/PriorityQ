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
import wallRoute from "./routes/wallpaper.js";
import qubeRoute from "./routes/qube.js";
import zoneRoute from "./routes/zone.js";
import messageRoute from "./routes/message.js";
import schedmsgRoute from "./routes/schedmsg.js"
import userzoneRoute from "./routes/userzone.js";
import inviteRoute from "./routes/invites.js";
import fileRoute from "./routes/file.js";
import tagRoute from "./routes/tag.js";
import reqRoute from "./routes/request.js";
import chatRoute from "./routes/chat.js";
import Message from "./models/Message.js";
import { v2 as cloudinary } from "cloudinary";
import { attachmentsMulter } from "./middlewares/multer.js";
//import {messagecron} from "./workers/SchedMsg.js";
import cron from "node-cron";
import moment from "moment";
import SchedMsg from "./models/SchedMsg.js";
import {Expo} from "expo-server-sdk";

const app=express();
const server = http.createServer(app);
const io = socketConfig(server);
dotenv.config();



connectDB(process.env.MONGO_URI);  // connected to mongodb

//middlewares
app.use(express.json({limit:'500mb'}));
app.use(cookieParser());
app.use(cors());
const expo=new Expo();
//apis
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/hub",hubRoute);
app.use("/wall",wallRoute);
app.use("/qube",qubeRoute);
app.use("/zone", zoneRoute);
app.use("/message",messageRoute);
app.use("/schedmsg", schedmsgRoute);
app.use("/read", userzoneRoute);
app.use("/invite",inviteRoute);
app.use("/file",fileRoute);
app.use("/tag",tagRoute);
app.use("/request",reqRoute);
app.use("/chat",chatRoute);
// app.use("/api/v1/chat", chatRoute);
// app.use("/api/v1/admin", adminRoute);

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
  socket.on('joinZone', (zone) => {
    socket.join(zone);
    console.log(`User ${socket.id} joined zone ${zone}`);
  });

  socket.on('exitZone',(zone)=>{
    
    socket.leave(zone);
    io.in(zone).allSockets().then((clients) => {
      const socketIds = Array.from(clients);
      console.log(`Sockets in room ${zone}:`, socketIds);
    }).catch((err) => {
      console.error(err);
    });
  })

  // socket.on('sendMessage', (message) => {
  //   io.emit('receiveMessage', message);
  // });

  socket.on('sendMessage',async(message) => {
    //const { zone, message } = data;
    //const file=req.file;
   
    const hashtagRegex = /#\w+/g;
    const hashtags = message.text.match(hashtagRegex);
    //console.log(message.folder);
    console.log("hello");
    let messageforDB={
      text:message.text,
      senderAvatar:message.senderAvatar,
      senderName:message.senderName,
      name_file:message.name_file,
      file:message.file,
      folder:message.folder,
      name_folder:message.name_folder,
      sender_id:message.sender_id,
      zone_id:message.zone,
      qube_id:message.qube,
      
    }
    if(hashtags){
      messageforDB={...messageforDB,tags:hashtags[0]};
    }
    console.log(message.zone);
    const newMessage=new Message(messageforDB);
    let savednewMessage=await newMessage.save();
    savednewMessage={...savednewMessage.toObject(),color:message.color};
    io.to(message.zone).emit('receiveMessage', savednewMessage);
    let notifs=[];
    message.members.forEach(user=>{
      if (Expo.isExpoPushToken(user.pushtoken)) 
      {notifs.push({
        to:user.pushtoken,
        title:`${message.hubname}/${message.qubename}`,
        body:`${message.senderName} sent a message`
      })}
    })
    
    let chunks = expo.chunkPushNotifications(notifs);
    //console.log(chunks);
    try {
      for (let chunk of chunks) {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
       // tickets.push(...ticketChunk);
       //console.log('sent notif');
      }
    } catch (error) {
      console.error(error);
    }

    console.log('ok');
   }
  );
  socket.on('StartType', (data) => {
    const { sender_name, qube, zone } = data;
    console.log(zone);
    // Broadcast to other clients in the same qube and zone that this user has started typing
    io.to(zone).emit('UserTyping', {
      user: sender_name,
      typing: true,
    });

    console.log(`User ${sender_name} started typing in Qube: ${qube}, Zone: ${zone}`);
  });
   
  // Listen for StopType event
  socket.on('StopType', (data) => {
    const { sender_name, qube, zone } = data;
    
    // Broadcast to other clients in the same qube and zone that this user has stopped typing
    io.to(zone).emit('UserTyping', {
      user: sender_name,
      typing: false,
    });

    console.log(`User ${sender_name} stopped typing in Qube: ${qube}, Zone: ${zone}`);
  });
});

cron.schedule('* * * * *', async () => {
  const now = moment().local().format('YYYY-MM-DDTHH:mm:ss.SSS');
  console.log(now);
  // Find messages where the scheduled_time is less than or equal to now
  const messagesToSend = await SchedMsg.find({ 
    scheduled_time: { $lte: now },
    status: 'Pending'
  });
  //console.log(messagesToSend);
  for (const message of messagesToSend) {
    // Send message to the recipient (use your message sending logic)
    console.log(message.zone);
    let messageforDB={
      text:message.text,
      senderAvatar:message.senderAvatar,
      senderName:message.senderName,
      name_file:message.name_file,
      file:message.file,
      folder:message.folder,
      name_folder:message.name_folder,
      sender_id:message.sender_id,
      zone_id:message.zone.toString(),
      qube_id:message.qube.toString()
    }
    const newMessage =new Message(messageforDB);
    const savedMsg=await newMessage.save();
    io.to(message.zone.toString()).emit('receiveMessage', newMessage);
    // Update message status to 'Sent'
    message.status = 'Sent';
    await message.save();
  }
});



server.listen(3001,'0.0.0.0',()=>{//started node server
    console.log("Server is up");
})