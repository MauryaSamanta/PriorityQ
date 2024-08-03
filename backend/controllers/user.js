// controllers/userController.js
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
//import cloudinary from "../ExternalConnections/cloudinary.js";
import {v4 as uuid} from "uuid";
import fs from "fs";
export const updateAvatar = async (req, res, next) => {
  
  try {
    // // Find the user
    
    const user = await User.findById(req.params.userId);
    //console.log(user);
    const file=req.file;
    const {username,bio}=req.body;
    
    if (!user) {
       return res.status(404).json({ error: 'User not found' });
    }
    //console.log(cloudinary);
    if(file)
    {cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    // // Upload to Cloudinary
     const result = await cloudinary.uploader
     .upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`,function (error, result){
      console.log(result);
      if (error){
        console.log(error);
        res.status(400).json("Not working");
      }
    }
    
    );}
     //console.log(user);
    // // // Update user avatar URL
     if(user.username!==username)
      user.username=username;
    if(user.bio!==bio)
      user.bio=bio;
     if(file)
     user.avatar_url = result.secure_url;
    const Useradd=await user.save();

    // // // Delete the file from server after uploading to cloudinary
    // fs.unlinkSync(req.file.path);
    //console.log(req.params.userId);
    res.json(Useradd);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUser=async(req,res)=>{
    const userId=req.params.userId;
    try {
      const user=await User.findById(userId);
      res.status(200).json({user});
    } catch (error) {
      console.lof(error);
      res.status(400).json({message:`Server down`});
    }
}



