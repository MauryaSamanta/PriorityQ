import Chat from "../models/Chat.js";
import User from "../models/User.js";
import Request from "../models/Request.js";
export const makechat=async(req,res)=>{
    const {reqid,userid, senderid}=req.body;
    try {
        const newchat=new Chat({
            members:[userid,senderid]
        });
        const savedChat=await newchat.save();
        const deletereq=await Request.deleteOne({_id:reqid});
        res.status(200).json(savedChat);
    } catch (error) {
        console.log(error);
        res.status(400).json(`Error`);
    }
}
export const getchats = async (req, res) => {
    const { userid } = req.params;
  
    try {
      // Fetch chats where the members array contains the user ID
      const chats = await Chat.find({
        members: userid
      })
      .populate({
        path: 'members',
        select: 'username avatar_url public_key pushtoken', // Adjust fields as needed
        model: User
      })
      .exec();
       //console.log(chats);
      // Return the chats with populated user data
      res.status(200).json({ chats });
    } catch (error) {
      console.error('Error fetching chats:', error);
      res.status(500).json({ error: 'An error occurred while fetching chats.' });
    }
  };