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
    const {text,senderAvatar,senderName,sender_id, zone,qube}=req.body;
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
      const hashtagRegex = /#\w+/g;
      const hashtags = text.match(hashtagRegex);

      try {
        let messageforDB={
            text:text,
            senderAvatar:senderAvatar,
            senderName:senderName,
            name_file:file.originalname,
            file:result.secure_url,
            sender_id:sender_id,
            zone_id:zone,
            
        };
        if(qube && qube!=='null'){
          console.log(typeof qube);
          messageforDB={...messageforDB,qube_id:qube};
        }
        if(hashtags){
          messageforDB={...messageforDB,tags:hashtags[0]};
        }
        req.io.to(zone).emit('receiveMessage', messageforDB);
        const newMessage=new Message(messageforDB);
        const savednewMessage=await newMessage.save();
    
        res.status(200).json('Success');
      } catch (error) {
        console.log(error);
        res.status(400).json('error');
      }
}

export const sendMessagewithFolder=async(req,res)=>{
      const files=req.files;
      // console.log("le");
      // console.log(files);
      const {text,name_folder,senderAvatar,senderName,sender_id, zone,qube}=req.body;
      console.log(name_folder);
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });

      const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,function (error, result) {
              if (error) {
                reject(error);
              } else {
                resolve({
                  file_name: file.originalname,
                  file_url: result.secure_url
                });
              }
            }
          );
        });
      });
      const hashtagRegex = /#\w+/g;
      const hashtags = text.match(hashtagRegex);

      try {
        const results = await Promise.all(uploadPromises);
        console.log(results);
        let messageforDB={
          text:text,
          senderAvatar:senderAvatar,
          senderName:senderName,
          name_folder:name_folder,
          folder:results,
          sender_id:sender_id,
          zone_id:zone,
          
      };
      if(qube && qube!=='null'){
        messageforDB={...messageforDB,qube_id:qube};
      }
      if(hashtags){
        messageforDB={...messageforDB,tags:hashtags[0]};
      }
      req.io.to(zone).emit('receiveMessage', messageforDB);
      const newMessage=new Message(messageforDB);
      const savednewMessage=await newMessage.save();
      console.log(savednewMessage);
      res.status(200).json('Success');
        
      } catch (err) {
       console.log(err);
      }
}



export const messagewithaudio = async (req, res) => {
  const file = req.file;
  const { senderAvatar, senderName, sender_id, zone, qube } = req.body;

  if (!file) {
    return res.status(400).json('No file uploaded');
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  try {
    // Upload the file to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', format: 'mp3' },
        (error, result) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(file.buffer);
    });

    // const hashtagRegex = /#\w+/g;
    // const hashtags = text ? text.match(hashtagRegex) : null;

    let messageforDB = {
      voice: result.secure_url,
      senderAvatar: senderAvatar,
      senderName: senderName,
      folder:[],
      sender_id: sender_id,
      zone_id: zone,
    };

    if (qube && qube !== 'null') {
      messageforDB = { ...messageforDB, qube_id: qube };
    }
    console.log(messageforDB);
     const newMessage = new Message(messageforDB);
    req.io.to(zone).emit('receiveMessage', newMessage);
    await newMessage.save();

    res.status(200).json('Success');
  } catch (error) {
    console.log(error);
    // Ensure headers are not already sent
    if (!res.headersSent) {
      res.status(400).json('Error');
    }
  }
};

export const deleteMessage=async(req,res)=>{
   const {messageid}=req.params;
   try {
    const deletedmessage=await Message.deleteOne({_id:messageid});
    req.io.emit('deleteMessage',(messageid));
    res.status(200).json(`Success`);
   } catch (error) {
    console.log(error);
    res.status(400).json(`Error`);
   }
}