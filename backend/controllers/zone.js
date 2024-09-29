import Zone from "../models/Zone.js";

export const createZone=async(req,res)=>{
    const qubeid=req.params.qubeid;
    const {name}=req.body;
    //console.log(name);
    try {
        const newZone=new Zone({
            qube_id:qubeid,
            name:name
        });
        const savedZone=await newZone.save();
        res.status(200).json({savedZone});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:`Server Error`});
    }
}