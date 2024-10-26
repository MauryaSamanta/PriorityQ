import Qubemembers from "../models/Qubemembers.js";
import QubePermissions from "../models/QubePermissions.js";

export const sendrequest=async(req,res)=>{
    const {qube, user, hub}=req.body;
    try {
        const data={user_id:user,qube_id:qube, hub_id:hub};
        const newpermissionreq=new QubePermissions(data);
        const sendpermission=await newpermissionreq.save();
        res.status(200).json('success');
    } catch (error) {
        console.log(error);
        res.status(400).json('Failed');
    }
}

export const getrequests=async(req,res)=>{
    const {hub}=req.body;
    try {
        const requests=await QubePermissions.find({hub_id:hub}).populate('qube_id').populate('user_id');
        res.status(200).json(requests);
    } catch (error) {
        console.log(error);
        res.status(400).json(`Failed`);
    }
}

export const checkstatus=async(req,res)=>{
    const {userid,qubeid}=req.body;
    try {
        const checkstat=await QubePermissions.findOne({user_id:userid, qube_id:qubeid});
        //console.log(checkstat);
        if(checkstat)
            res.status(200).json('True');
        else
            res.status(200).json('False');
    } catch (error) {
        
    }
}

export const processrequests=async(req,res)=>{
    const {qube_id,user_id,hub_id, status, req_id}=req.body;
    //console.log(req.body);
    try {
        if(status==='accept')
        {
            const newMember=new Qubemembers({
            qube_id:qube_id,
            hub_id:hub_id,
            user_id:user_id
        });
        const savenewMember=await newMember.save();
        console.log(savenewMember);
        const deletereq=await QubePermissions.deleteOne({_id:req_id});
        console.log(deletereq);
        res.status(200).json(`Success`);}
        else
        {
            const deletereq=await QubePermissions.deleteOne({user_id:user_id, qube_id:qube_id});
            res.status(200).json(`Success`);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(`Failed`);
    }
}