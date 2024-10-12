import Request from "../models/Request.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js";
export const sendreq=async(req,res)=>{
    const {senderid, recname}=req.body;
   try{ const rec=await User.findOne({username:recname});
    if(!rec)
        return res.status(200).json(`User doesnot exist`);

    const recid=rec._id;
    const chat = await Chat.findOne({
        members: { $all: [senderid, recid] }
    });
    console.log(chat);
    if(chat)
        return res.status(200).json(`Friend`);
    const newreq=new Request({sender_id:senderid,
                              receiver_id:recid
    });
    const savedreq=await newreq.save();
    res.status(200).json(`Success`);}
    catch(error){
        console.log(error);
        res.status(400).json(`Error`);
    }
}

export const getreq=async(req,res)=>{
    const {userid}=req.params;
    console.log(userid);
    try {
        const reqs = await Request.find({ receiver_id: userid })
            .populate('sender_id', 'username avatar_url') // Adjust the fields to populate as needed
            .exec();
            console.log(reqs);
        res.status(200).json(reqs);
    } catch (error) {
        console.log(error);
        res.status(400).json(`Error`);
    }
}

export const reqstat=async(req,res)=>{
    const {userid,senderid}=req.params;
    console.log('hello');
    try {
        const reqs = await Request.findOne({ receiver_id: userid, sender_id:senderid })
        const reqs2=await Request.findOne({receiver_id:senderid, sender_id:userid});
        if(reqs || reqs2)
        {   const chat = await Chat.findOne({
            members: { $all: [senderid, userid] }
        });
        //console.log(chat);
            if(chat)
            res.status(200).json('friend');
        else
            res.status(200).json('sent');
        }
        else
        res.status(200).json('not sent');
    } catch (error) {
        console.log(error);
        res.status(400).json(`Error`);
    }
}