import UserZone from "../models/UserZone.js";

export const getlastread=async(req,res)=>{
    const {userid, zoneid}=req.body;
    //.log(userid,zoneid);
    try {
        const lastread=await UserZone.findOne({user_id:userid, zone_id:zoneid});
        let unread={};
        if(lastread)
         unread={id:lastread.lastread};
        else
        unread={id:'no'}
        res.status(200).json(unread);
    } catch (error) {
        console.log(error);
        res.status(400).json(`Error`);
    }
}

export const updateunread=async(req,res)=>{
    const {userid,zoneid, lastmessageid}=req.body;
    
    try {
        const getread=await UserZone.findOne({user_id:userid, zone_id:zoneid});
        if(!getread){
            const newuserzone=new UserZone({
                user_id:userid,
                zone_id:zoneid,
                lastread:lastmessageid
            });
            await newuserzone.save();
            
        }
        else{
            getread.lastread=lastmessageid;
            await getread.save();
        }
        res.status(200).json(`Success`);

    } catch (error) {
        console.log(error);
        res.status(400).json(`Error`);
    }
}