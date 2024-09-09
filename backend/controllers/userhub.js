import UserHub from "../models/UserHub.js";

export const getdetails=async(req,res)=>{
    const {hubid, userid}=req.params;
    try {
        const details=await UserHub.findOne({hub_id:hubid,user_id:userid});
        if(details)
            res.status(200).json(details);
        else
            res.status(200).json(`NO`);
    } catch (error) {
        console.log(error);
        res.status(400).json(`Error`);
    }
}

export const update=async(req,res)=>{
    const {hubid,userid}=req.params;
    const {nickname,color}=req.body;
    try {
        const data={user_id:userid,hub_id:hubid,nickname:nickname,color:color};
        const details=await UserHub.findOne({hub_id:hubid,user_id:userid});
        if(details){
            details.nickname=nickname;
            details.color=color;
            await details.save();
            res.status(200).json(details);
        }
        else
       { const newuserhub=new UserHub(data);
         const newsave=await newuserhub.save();
         res.status(200).json(newsave);
       }
        
    } catch (error) {
        console.log(error);
        res.status(400).json(`Error`);
        
    }
}