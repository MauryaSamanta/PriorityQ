import Qube from "../models/Qube.js"
import Qubemembers from "../models/Qubemembers.js";
import Zone from "../models/Zone.js";
export const createQube=async(req,res)=>{
    const hubid=req.params.hubid;
    const {qube_name,nick_name} =req.body;
    console.log(req.body);
    try {
        const newQube=new Qube({
            hub_id:hubid,
            name:qube_name,
            nickname:nick_name
        })
        const savedQube=await newQube.save();

        const newQubeMember=new Qubemembers({
            qube_id:savedQube.id.toString(),
            hub_id:hubid,
            user_id:req.user.id
        })
        const savedQubeMember=await newQubeMember.save();
        const newZone=new Zone({
            qube_id:savedQube.id.toString(),
            name:'Discussion'
        });
        const savedZone=await newZone.save();
        res.status(200).json({savedQube, savedQubeMember});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:`Server Error`});
    }
}

export const addMemberstoQube=async(req,res)=>{
    const qubeid=req.params.qubeid;
    const {memberId}=req.body;
    try {
        const newQubeMember=new Qubemembers({
            qube_id:qubeid,
            user_id:memberId
        })
        const savedQubeMember=await newQubeMember.save();
        res.status(200).json({savedQubeMember});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:`Server Error`});
    }
}

export const listUsersInQube=async(req,res)=>{
    try {
        const qubeid = req.params.qubeid;
        console.log(qubeid);
        // Find members of the hub and populate their user details
        const members = await Qubemembers.find({ qube_id: qubeid }).populate('user_id');
    
        // Extract user details into an array
        const userDetails = members.map(member => member.user_id);
        console.log(userDetails);
        // Send the array of user details as JSON response
        res.status(200).json({userDetails});
      } catch (error) {
        console.error('Error listing users in hub:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

export const editQube=async(req,res)=>{
    try {
        const qubeid=req.params.qubeid;
        const {qubename, qubenickname}=req.body;
        const qube=await Qube.findById(qubeid);
        if(qubename)
        qube.name=qubename;
        if(qubenickname)
        qube.nickname=qubenickname;
        await qube.save();
        res.status(200).json({qube});
    } catch (error) {
        console.log(error);
        res.status(400).json(`Error`);
    }
}

export const listZonesInQube=async(req,res)=>{
    try {
        const qubeid=req.params.qubeid;
        const zones=await Zone.find({qube_id:qubeid});
        res.status(200).json({zones});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:`Internal Server Error`});
    }
}