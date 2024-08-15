import Hub from "../models/Hub.js";
import Hubmembers from "../models/Hubmembers.js";
import Qube from "../models/Qube.js";
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
    console.log(hubid);
    try {
        const qubes=await Qube.find({hub_id:hubid});
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
      
    res.status(200).json({ savedHub });
    } catch (error) {
      console.log(error);
      res.status(400).json(`Error`);
    }
  }

  export const deleteHubs=async(req,res)=>{
    const hubid=req.params.hubid;
    try {
      const deleteMembers=await Hubmembers.deleteMany({hub_id:hubid});
      const deletedHub = await Hub.findByIdAndDelete(hubid);
      console.log(deletedHub);
      res.status(200).json(deletedHub);
    } catch (error) {
      console.log(error);
      res.status(500).json({error:`Internal Server Issue`});
    }
  }

  