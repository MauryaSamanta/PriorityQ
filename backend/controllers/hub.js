import Hub from "../models/Hub.js";
import Hubmembers from "../models/Hubmembers.js";
import Qube from "../models/Qube.js";
import Zone from "../models/Zone.js";
import Message from "../models/Message.js";
import Qubemembers from "../models/Qubemembers.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";

export const createHub=async(req,res)=>{
    const {name, description,filedata}=req.body;
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
    if(filedata)
    {const result = await cloudinary.uploader
      .upload(filedata,function (error, result){
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
            owner_id:[req.user.id],
            avatar_url:avatar_url
        });
        const savedHub=await newHub.save();
        console.log(req.user.id);
        const newMember=new Hubmembers({
            hub_id: savedHub._id.toString(),
            user_id:req.user.id
        });
        const savednewMember=await newMember.save();
        

        res.status(201).json({savedHub, savednewMember});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:`Server Error`});
    }
}

export const createHubApp=async(req,res)=>{
  const {name, description,filedata}=req.body;
  const file=req.file;
 // console.log(file);
  let avatar_url='';
  cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    // // Upload to Cloudinary
      if(filedata)
     {const result = await cloudinary.uploader
     .upload(filedata,function (error, result){
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
          owner_id:[req.user.id],
          avatar_url:avatar_url
      });
      const savedHub=await newHub.save();
      console.log(req.user.id);
      const newMember=new Hubmembers({
          hub_id: savedHub._id.toString(),
          user_id:req.user.id
      });
      const savednewMember=await newMember.save();
      

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
        let qubes=await Qube.find({hub_id:hubid});
       // Step 2: Create a new array to hold updated qubes
       const updatedQubes = await Promise.all(qubes.map(async (qube) => {
        // Check if access is 'false'
        if (qube.access === 'false') {
            // Step 3: Find all members for this qube
            const members = await Qubemembers.find({ qube_id: qube._id });
            // Extract user_ids from the members
            const userIds = members.map(member => member.user_id);
            // Add user_ids to the qube object
            return { ...qube._doc, members: userIds }; // Use _doc to get the plain object representation
        }
        // Return the qube unchanged if access is not 'false'
        return qube;
    }));
    qubes=updatedQubes;
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
    const {hubname, desc, demonym}=req.body;
    console.log(req.body);
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
      if(hub.demonym!==demonym)
        hub.demonym=demonym;
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

export const addowners=async(req,res)=>{
 const {hubid,user}=req.body;
 try {
  const foundHub=await Hub.findById(hubid);
  const founduser=await User.findById(user);
  foundHub.owner_id.push(user);
  const savedHub=await foundHub.save();
  res.status(200).json({savedHub,founduser});
 } catch (error) {
  console.log(error);
  res.status(400).json('error');
  
 }
}

export const removeowners=async(req,res)=>{
  const {hubid,user}=req.body;
  try {
   const foundHub=await Hub.findById(hubid);
   const founduser=await User.findById(user);
   foundHub.owner_id.pull(user);
   const savedHub=await foundHub.save();
   res.status(200).json({savedHub,founduser});
  } catch (error) {
   console.log(error);
   res.status(400).json('error');
   
  }
}


  //changeHubstructure();

  
  