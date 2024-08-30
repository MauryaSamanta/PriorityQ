import Hub from "../models/Hub.js";
import Hubmembers from "../models/Hubmembers.js";
import Qube from "../models/Qube.js";
import Zone from "../models/Zone.js";
import Message from "../models/Message.js";
import Qubemembers from "../models/Qubemembers.js";
import { v2 as cloudinary } from "cloudinary";
export const createHub=async(req,res)=>{
    const {name, description}=req.body;
    const file=req.file;
    console.log(file);
    let avatar_url='';
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });
      // // Upload to Cloudinary
        if(file)
       {const result = await cloudinary.uploader
       .upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`,function (error, result){
        //console.log(result);
        if (error){
          console.log(error);
          res.status(400).json("Not working");
        }
      }
      );
      avatar_url=result.secure_url;
    }
    //console.log(req.user.id);
    try {

        const newHub=new Hub({
            name,
            description,
            owner_id:req.user.id,
            avatar_url:avatar_url
        });
        const savedHub=await newHub.save();
        console.log(req.user.id);
        const newMember=new Hubmembers({
            hub_id: savedHub._id.toString(),
            user_id:req.user.id
        });
        const savednewMember=await newMember.save();
        const newQube=new Qube({
          hub_id:savedHub._id,
          name:'Welcome Qube',
          nickname:'Hello'
        });
        const savednewQube=await newQube.save();
        const newzone=new Zone({
          qube_id:savednewQube._id,
          name:'Starter'
        });
        const savednewZone=await newzone.save();
        let message=new Message({
            text:`Welcome to the Hub experience of EloKo. We are glad that you created your first hub.😀\n \n
           In EloKo, hubs are your primary spaces 🛖 where you can create qubes and zones to organize your activities and chats.🤠\n 
           Each qube represents a specific area within your hub, and zones within qubes allow for messaging and resource sharing.\n
           In the zones, you can send pdfs and images(upto 10MB) and also folders containing upto 10 pdfs and images. \n \n
           The files you receive are stored in our secure cloud spaces and will not hamper your devide storage.\n
           For each Hub you get your own personal cloud Library😊 where you save your files and folders and view them just like its your desktop😁 \n \n
           You can share files and folders directly from your Library and also add tags to messages in the zones and more features yet to come 😉 \n \n
           Invite your friends to the Hub and enjoy the experience \n \n
           With Love,\n
           From EloKo`,
            senderAvatar:'https://res.cloudinary.com/df9fz5s3o/image/upload/v1724992556/EloKoMain_hwnwyn.png',
            senderName:'EloKo',
            qube_id:savednewQube._id,
            zone_id:savednewZone._id
        });
        const savednewMessage=await message.save();

        res.status(201).json({savedHub, savednewMember});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:`Server Error`});
    }
}

export const addMembertoHub=async(req,res)=>{
    const hubId=req.params.hubid;
    const {memberId}=req.body;
    try
    {const newMember=new Hubmembers({
        hub_id: hubId,
        user_id:memberId
    });
    const savednewMember=await newMember.save();
    res.status(201).json({savednewMember});}
    catch(error){
        console.log(error);
        res.status(400).json({message:`Server Error`});
    }
    
}

export const leaveHub=async(req,res)=>{
  const hubid=req.params.hubid;
  const {userid}=req.body;
  try {
    const deletion=await Hubmembers.deleteOne({hub_id:hubid, user_id:userid});
    res.status(200).json({deletion});
  } catch (error) {
    console.log(error);
    res.status(500).json(`Internal server error`);
  }
}

export const listUsersInHub = async (req, res) => {
    try {
      const hubId = req.params.hubid;
  
      // Find members of the hub and populate their user details
      const members = await Hubmembers.find({ hub_id: hubId }).populate('user_id');
  
      // Extract user details into an array
      const userDetails = members.map(member => member.user_id);
      console.log(userDetails);
      // Send the array of user details as JSON response
      res.status(200).json({userDetails});
    } catch (error) {
      console.error('Error listing users in hub:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const listQubesInHub=async(req,res)=>{
    const hubid=req.params.hubid;
    const id=req.user.id;
    console.log(hubid);
    try {
        const qubes=await Qube.find({hub_id:hubid});
       // const qubes=myqubes.map(myqube=>myqube.qube_id);
        res.status(200).json({qubes});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:`Server Error`});
    }
  }

  export const getHubs=async(req,res)=>{
    const userid=req.user.id;
    try {
        const myhubs=await Hubmembers.find({user_id:userid}).populate('hub_id');
        const hubDetails = myhubs.map(myhub => myhub.hub_id);
        //const hubDetails=myhubs.map(hub=>hub.name);

        res.status(200).json(hubDetails);
    } catch (error) {
        console.error('Error listing users in hub:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  }

  export const editHub=async(req,res)=>{
    const {hubid}=req.params;
    const file=req.file;
    
    const hub = await Hub.findById(hubid);
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    if (hub.banner_url) {
      const publicId = hub.banner_url.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId, function (error, result) {
        if (error) {
          console.log('Error deleting previous avatar:', error);
        } else {
          console.log('Previous avatar deleted:', result);
        }
      });
    }
    try {
      const result = await cloudinary.uploader
       .upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`,function (error, result){
        //console.log(result);
        if (error){
          console.log(error);
          res.status(400).json("Not working");
        }
      }
      );
      
      hub.banner_url=result.secure_url;
      const savedHub=await hub.save();
      
    res.status(200).json( savedHub );
    } catch (error) {
      console.log(error);
      res.status(400).json(`Error`);
    }
  }

  export const editHubDetails=async(req,res)=>{
    const hubid=req.params.hubid;
    const {hubname, desc}=req.body;
    const file=req.file;
    const hub=await Hub.findById(hubid);
      
    try {
      let result='';
    if(file)
    {cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    if (hub.avatar_url) {
      const publicId = hub.avatar_url.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId, function (error, result) {
        if (error) {
          console.log('Error deleting previous avatar:', error);
        } else {
          console.log('Previous avatar deleted:', result);
        }
      });
    }
    // // Upload to Cloudinary
      result = await cloudinary.uploader
     .upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`,function (error, result){
      
      if (error){
        console.log(error);
        res.status(400).json("Not working");
      }
    }
    
    );}
      
      if(hub.name!==hubname)
        hub.name=hubname;
      if(hub.description!==desc)
        hub.description=desc;
      if(file)
        hub.avatar_url=result.secure_url;
      const hubsave=await hub.save();
      res.json(hubsave);

    } catch (error) {
      console.log(error);
      res.status(400).json(`Error`);
    }
  }

  export const deleteHubs=async(req,res)=>{
    const hubid=req.params.hubid;
    req.io.emit('deleteHub',hubid);
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });
      const deleteMembers=await Hubmembers.deleteMany({hub_id:hubid});
      const deleteQubes=await Qube.deleteMany({hub_id:hubid});
      const hub=await Hub.findById(hubid);
      if(hub.avatar_url)
      {
        const publicId = hub.avatar_url.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId, function (error, result) {
          if (error) {
            console.log('Error deleting previous avatar:', error);
          } else {
            console.log('Previous avatar deleted:', result);
          }
        });
      }
      if(hub.banner_url){
        const publicId = hub.banner_url.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId, function (error, result) {
          if (error) {
            console.log('Error deleting previous avatar:', error);
          } else {
            console.log('Previous avatar deleted:', result);
          }
        });
      }

      const deletedHub = await Hub.findByIdAndDelete(hubid);
      console.log(deletedHub);
      res.status(200).json(deletedHub);
    } catch (error) {
      console.log(error);
      res.status(500).json({error:`Internal Server Issue`});
    }
  }

  
  