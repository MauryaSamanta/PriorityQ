import mongoose, { Schema, model, Types } from "mongoose";

const messageSchema = new Schema(
  {
    text: String,
    senderAvatar:String,
    senderName:String,

    file:
        {
          type: String
        },
      

    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    zone_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;