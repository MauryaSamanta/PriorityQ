import Message from "../models/Message.js"
import { attachmentsMulter } from "../middlewares/multer.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/User.js";
export const getMessages=async(req,res)=>{
    const zoneid=req.params.zoneid;
    try {
        const messages=await Message.find({zone_id:zoneid}).populate('sender_id');
        // for (let message of messages) {
        //   const user = await User.findById(message.sender_id, 'username'); // Assuming you want to fetch name and email
        //   message.sender_info = user; // Add the populated data as a new field
        // }
        //console.log(messages);
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json(`Internal server error`);
    }
}

export const sendMessagewithFile=async(req,res)=>{
    const file=req.file;
    const {text,senderAvatar,senderName,sender_id, zone,qube, filedata, filename, uuid, members, hubname, qubename, color}=req.body;
    //console.log(members);
    
    let result;
    if(file)
    {cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });
      // // Upload to Cloudinary
        result = await cloudinary.uploader
       .upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`,function (error, result){
        //console.log(result);
        if (error){
          console.log(error);
          res.status(400).json("Not working");
        }
      }
      
      );}

      if(filedata){cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });
         result = await cloudinary.uploader
      .upload(filedata,function (error, result){
       //console.log(result);
       if (error){
         console.log(error);
         res.status(400).json("Not working");
       }
     }
     );
      }
      const hashtagRegex = /#\w+/g;
      const hashtags = text.match(hashtagRegex);

      try {
        let messageforDB={
            text:text,
            senderAvatar:senderAvatar,
            senderName:senderName,
           // name_file:file.originalname || filename,
            file:result.secure_url,
            sender_id:sender_id,
            zone_id:zone,
            
        };
        if(file)
        {
          messageforDB={...messageforDB,name_file:file.originalname};

        }
        else
        {
          messageforDB={...messageforDB,name_file:filename};
        }
        if(qube && qube!=='null'){
          console.log(typeof qube);
          messageforDB={...messageforDB,qube_id:qube};
        }
        if(hashtags){
          messageforDB={...messageforDB,tags:hashtags[0]};
        }
        
        const newMessage=new Message(messageforDB);
       // req.io.to(zone).emit('receiveMessage', newMessage);
        let savednewMessage=await newMessage.save();
         savednewMessage={...savednewMessage.toObject(),uuid:uuid, color:color};
        // console.log(savednewMessage);
        req.io.to(zone).emit('receiveMessage', savednewMessage);
    //     let notifs=[];
    // members.forEach(user=>{
    //   if (Expo.isExpoPushToken(user.pushtoken)) 
    //   {notifs.push({
    //     to:user.pushtoken,
    //     title:`${req.body.hubname}/${req.body.qubename}`,
    //     body:`${req.body.senderName} sent a message`
    //   })}
    // })
    
    // let chunks = expo.chunkPushNotifications(notifs);
    // //console.log(chunks);
    // try {
    //   for (let chunk of chunks) {
    //     let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
    //    // tickets.push(...ticketChunk);
    //    //console.log('sent notif');
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
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
      const {text,name_folder,senderAvatar,senderName,sender_id, zone,qube,foldername,filesarray,uuid, hubname, qubename, members, color}=req.body;
      //console.log(JSON.stringify(filesarray));
      //console.log(filesarray[0]);
      //console.log(req.files);
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });
      let uploadPromises;
      if(files)
       {uploadPromises = files.map((file) => {
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
      });}
      if(filesarray){
        uploadPromises = filesarray.map((file) => {
          return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(file.file_url,function (error, result) {
                if (error) {
                  reject(error);
                } else {
                  resolve({
                    file_name: file.file_name,
                    file_url: result.secure_url
                  });
                }
              }
            );
          });
        });
      }
      const hashtagRegex = /#\w+/g;
      const hashtags = text.match(hashtagRegex);

      try {
        const results = await Promise.all(uploadPromises);
        console.log(results);
        let messageforDB={
          text:text,
          senderAvatar:senderAvatar,
          senderName:senderName,
          //name_folder:name_folder,
          folder:results,
          sender_id:sender_id,
          zone_id:zone,
          
      };
      if(qube && qube!=='null'){
        messageforDB={...messageforDB,qube_id:qube};
      }
      if(name_folder){
        messageforDB={...messageforDB,name_folder:name_folder};
      }
      else
      {
        messageforDB={...messageforDB,name_folder:foldername};
      }
      if(hashtags){
        messageforDB={...messageforDB,tags:hashtags[0]};
      }
     
      const newMessage=new Message(messageforDB);
     
      let savednewMessage=await newMessage.save();
      savednewMessage={...savednewMessage.toObject(),uuid:uuid, color:color};
      req.io.to(zone).emit('receiveMessage', savednewMessage);
      // let notifs=[];
      // req.body.members.forEach(user=>{
      //   if (Expo.isExpoPushToken(user.pushtoken)) 
      //   {notifs.push({
      //     to:user.pushtoken,
      //     title:`${req.body.hubname}/${req.body.qubename}`,
      //     body:`${req.body.senderName} sent a message`
      //   })}
      // })
      
      // let chunks = expo.chunkPushNotifications(notifs);
      // //console.log(chunks);
      // try {
      //   for (let chunk of chunks) {
      //     let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      //    // tickets.push(...ticketChunk);
      //    //console.log('sent notif');
      //   }
      // } catch (error) {
      //   console.error(error);
      // }
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
    
    const msg=await newMessage.save();
    req.io.to(zone).emit('receiveMessage', msg);
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
   console.log(messageid);
   try {
    const deletedmessage=await Message.deleteOne({_id:messageid});
    req.io.emit('deleteMessage',(messageid));
    res.status(200).json(`Success`);
   } catch (error) {
    console.log(error);
    res.status(400).json(`Error`);
   }
}

const deletemessagefromazone=async(req,res)=>{
  try {
    const deletemessage=await Message.deleteMany({zone_id:'66a64b8bff9cc018837a88fb'})
    console.log(deletemessage);
  } catch (error) {
    console.log(error)
  }
}

//deletemessagefromazone();