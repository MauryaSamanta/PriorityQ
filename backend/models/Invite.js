import mongoose from "mongoose";
const inviteSchema = new mongoose.Schema({
  hub_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hub',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '2h' 
  }
  
});

//hubMemberSchema.index({ hub_id: 1, user_id: 1 }, { unique: true });

const Invite = mongoose.model('invites', inviteSchema);
export default Invite;