import Qube from "../models/Qube.js"
import Qubemembers from "../models/Qubemembers.js";
import Zone from "../models/Zone.js";
import crypto from 'crypto';

const generateKeyPair = () => {
    return crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      }
    });
  };
export const createQube=async(req,res)=>{
    const hubid=req.params.hubid;
    const {qube_name,nick_name, access,owners} =req.body;
    console.log(req.body);
    try {
        const newQube=new Qube({
            hub_id:hubid,
            name:qube_name,
            nickname:nick_name,
            access:access
        })
        let savedQube=await newQube.save();
        let members=[];
        if(access==='false')
        {await Promise.all(owners.map(async(owner)=>{
            const newQubeMember=new Qubemembers({
            qube_id:savedQube.id.toString(),
            hub_id:hubid,
            user_id:owner}
    )
    const savedQubeMember=await newQubeMember.save();
    members=[...members,owner];
}
)
)}
       
        const { publicKey } = generateKeyPair();
        const newZone=new Zone({
            qube_id:savedQube.id.toString(),
            name:'Discussion',
            symmkey:publicKey
        });
        const savedZone=await newZone.save();
        savedQube={...savedQube.toObject(),members};
        res.status(200).json({savedQube});
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

export const deleteQube=async(req,res)=>{
    try {
        const {qubeid}=req.params;
        const deleteQube=await Qube.deleteOne({_id:qubeid});
        res.status(200).json(`Deleted Qube`);
    } catch (error) {
        console.log(error);
        res.status(400).json(`Error`);
    }
}

const qubesaddaccess=async()=>{
    const result = await Qube.updateMany(
        {}, // No filter, so it affects all documents
        { $set: { access: true } } // Add access field with value true
      );
      console.log(result);
}


