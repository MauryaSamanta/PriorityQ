import mongoose, { Schema, model, Types } from "mongoose";

const userzoneSchema = new Schema(
{  user_id:{
    type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
  },
  zone_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Zone",
    required: true,
  },
  lastread:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    required: true,
  }

}
);

const UserZone = mongoose.model('UserZone', userzoneSchema);
export default UserZone;