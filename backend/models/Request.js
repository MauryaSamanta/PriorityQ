import mongoose from "mongoose";
const requestSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '48h' 
  }
  
});

//hubMemberSchema.index({ hub_id: 1, user_id: 1 }, { unique: true });

const Request = mongoose.model('requests', requestSchema);
export default Request;