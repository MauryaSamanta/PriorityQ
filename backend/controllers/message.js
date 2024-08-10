import Message from "../models/Message.js"
import { attachmentsMulter } from "../middlewares/multer.js";
import { v2 as cloudinary } from "cloudinary";
export const getMessages=async(req,res)=>{
    const zoneid=req.params.zoneid;
    try {
        const messages=await Message.find({zone_id:zoneid});
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json(`Internal server error`);
    }
}

export const sendMessagewithFile=async(req,res)=>{
    const file=req.file;
    const {text,senderAvatar,senderName,sender_id, zone}=req.body;
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });
      // // Upload to Cloudinary
       const result = await cloudinary.uploader
       .upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`,function (error, result){
        //console.log(result);
        if (error){
          console.log(error);
          res.status(400).json("Not working");
        }
      }
      
      );
      try {
        const messageforDB={
            text:text,
            senderAvatar:senderAvatar,
            senderName:senderName,
            name_file:file.originalname,
            file:result.secure_url,
            sender_id:sender_id,
            zone_id:zone
        };
        
        req.io.to(zone).emit('receiveMessage', messageforDB);
        const newMessage=new Message(messageforDB);
        const savednewMessage=await newMessage.save();
    
        res.status(200).json('Success');
      } catch (error) {
        console.log(error);
        res.status(400).json('error');
      }
}