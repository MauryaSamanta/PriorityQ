import mongoose, { Schema, model, Types } from "mongoose";

const userhubSchema = new Schema(
{  user_id:{
    type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
  },
  hub_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hub",
    required: true,
  },
  nickname:{
    type:String
  },
  color:{
    type:String
  }

}
);

const UserHub = mongoose.model('UserHub', userhubSchema);
export default UserHub;