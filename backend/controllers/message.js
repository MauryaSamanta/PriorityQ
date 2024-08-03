import Message from "../models/Message.js"

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