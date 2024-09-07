import SchedMsg from "../models/SchedMsg.js";

export const createschedmsg=async(req,res)=>{
    const {text,senderAvatar,senderName,sender_id, zone,qube, scheduled_time}=req.body;
    const hashtagRegex = /#\w+/g;
      const hashtags = text.match(hashtagRegex);
      let messageforDB={
            text:text,
            senderAvatar:senderAvatar,
            senderName:senderName,
            sender_id:sender_id,
            scheduled_time:scheduled_time,
            zone:zone,
            status:'Pending'
            
        };
        if(qube && qube!=='null'){
          console.log(typeof qube);
          messageforDB={...messageforDB,qube:qube};
        }
        if(hashtags){
          messageforDB={...messageforDB,tags:hashtags[0]};
        }
    try {
        const newschedmsg=new SchedMsg(messageforDB);
        const savednewmsg=newschedmsg.save();
        res.status(200).json(`Saved`);

    } catch (error) {
        console.log(error);
        res.status(400).json(`Error`);
    }
}