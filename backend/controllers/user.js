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
    const file=req.file;
    if (!user) {
       return res.status(404).json({ error: 'User not found' });
    }
    //console.log(cloudinary);
    cloudinary.config({
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
    
    );
     console.log(user);
    // // // Update user avatar URL
     user.avatar_url = result.secure_url;
    const User=await user.save();

    // // // Delete the file from server after uploading to cloudinary
    // fs.unlinkSync(req.file.path);
    //console.log(req.params.userId);
    res.json({User});
    next();
  } catch (error) {
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



