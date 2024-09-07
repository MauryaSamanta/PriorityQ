import mongoose, { Schema, model, Types } from "mongoose";

const schedmessageSchema = new Schema(
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
    zone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone"
    },
    qube:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Qube"
    },
    tags:{
      type:String
    },
    scheduled_time:{
        type:String
    },
    status:{
        type:String
    }
    
  },
 
  {
    timestamps: true,
  }
);

const SchedMsg = mongoose.model('SchedMsg', schedmessageSchema);
export default SchedMsg;