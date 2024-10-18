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

export const getkey=async(req,res)=>{
    const {zoneid}=req.params;
    try {
        const foundZone=await Zone.findById(zoneid);
        res.status(200).json(foundZone.symmkey);
    } catch (error) {
        console.log(error);
        res.status(400).json('error');
    }
}

const setpreZonesymmkey=async(req,res)=>{
   // const {zoneid}=req.params;
    try {
        const foundZones=await Zone.find({});
        foundZones.map(async(zone)=>{
            if(!zone.symmkey){
                const { publicKey } = generateKeyPair();
                zone.symmkey = publicKey;
                //    // foundZone.private_key = privateKey;
              
                //     // Save the updated user back to the database
                await zone.save();
                console.log(zone);
            }
        })
       
    } catch (error) {

        console.log(error);
       // res.status(400).json('Not Success');
    }
}

//setpreZonesymmkey();