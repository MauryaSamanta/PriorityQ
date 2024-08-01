import Invite from "../models/Invite.js";
import Hubmembers from "../models/Hubmembers.js";
import crypto from "crypto";
export const getInvite=async(req,res)=>{
    console.log("hello");
    const {user_id}=req.params;
    const {code}=req.body;
    console.log(code);
    try {
        const invite=await Invite.findOne({code:code});
        console.log(invite.hub_id);
        const hubData={hub_id:invite.hub_id};
        
            const newMember=new Hubmembers({
                hub_id: invite.hub_id,
                user_id:user_id
            });
            const savednewMember=await newMember.save();
            res.status(201).json({savednewMember, hubData});

    } catch (error) {
        console.log(error);
        res.status(500).json(`Internal error`);
    }
}

export const createInvite=async(req,res)=>{
    const code = crypto.randomBytes(16).toString('hex');
    const {hubid}=req.params;
    try {
        const newInvite=new Invite({
            hub_id:hubid,
            code:code
        });
        const savedInvite=await newInvite.save();
        res.status(201).json(savedInvite);
    } catch (error) {
        console.log(error);
        res.status(400).json({err:error.message});
    }
}