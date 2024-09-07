import mongoose, { Schema, model, Types } from "mongoose";

const messageSchema = new Schema(
  {
    text: String,
    voice:String,
    senderAvatar:String,
    senderName:String,
    name_file:String,
    file:
        {
          type: String
        },
      
    folder:[
      { file_name: {
       type: String,
       required: true,
     },
     file_url: {
       type: String,
       required: true,
     }}
     ],
    name_folder:{
      type:String
    },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    zone_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone"
    },
    qube_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Qube"
    },
    tags:{
      type:String
    },
    
  },
 
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;