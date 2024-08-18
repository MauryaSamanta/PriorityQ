import Wallpaper from "../models/Wallpaper.js";
import { v2 as cloudinary } from "cloudinary";
export const changewall=async(req,res)=>{

    const {id}=req.body;
    const hubid=req.params.hubid;
    const file=req.file;
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
        const wallpaper=await Wallpaper.findOne({user_id:id,hub_id:hubid})
        console.log(wallpaper);
        if(wallpaper)
        {
            wallpaper.wall_url=result.secure_url;
            await wallpaper.save();
            res.status(200).json(wallpaper);
        }
        else
        {
            const wall=new Wallpaper({
                user_id:id,
                hub_id:hubid,
                wall_url:result.secure_url
            })
            const savedWall=await wall.save();
            res.status(200).json({savedWall});
        }
        
      } catch (error) {
             console.log(error);
             res.status(400).json(`Error`);
      }

}

export const getwall=async(req,res)=>{
    //const {id}=req.body;
    const hubid=req.params.hubid;
    const userid=req.params.userid;
    try {
        const wall=await Wallpaper.find({user_id:userid, hub_id:hubid});
       // console.log(wall[0].wall_url);
        res.status(200).json(wall);
    } catch (error) {
        console.log(error);
        res.status(400).json(`Error`);
    }
}