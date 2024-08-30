// controllers/userController.js
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
//import cloudinary from "../ExternalConnections/cloudinary.js";
import {v4 as uuid} from "uuid";
import fs from "fs";
export const updateAvatar = async (req, res, next) => {
  try {
    // Find the user
    const user = await User.findById(req.params.userId);
    const file = req.file;
    const { username, bio } = req.body;

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let result = '';

    if (file) {
      // Configure Cloudinary
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });

      // Delete existing avatar from Cloudinary if it exists
      if (user.avatar_url) {
        const publicId = user.avatar_url.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId, function (error, result) {
          if (error) {
            console.log('Error deleting previous avatar:', error);
          } else {
            console.log('Previous avatar deleted:', result);
          }
        });
      }

      // Upload new avatar to Cloudinary
      result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        function (error, result) {
          if (error) {
            console.log(error);
            return res.status(400).json("Upload failed");
          }
        }
      );
    }

    // Update user details
    if (user.username !== username) user.username = username;
    if (user.bio !== bio) user.bio = bio;
    if (file) user.avatar_url = result.secure_url;

    const updatedUser = await user.save();

    res.json(updatedUser);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const getUser=async(req,res)=>{
    const userId=req.params.userId;
    try {
      const user=await User.findById(userId).select('-password_hash -email');
      console.log(user);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(400).json({message:`Server down`});
    }
}



