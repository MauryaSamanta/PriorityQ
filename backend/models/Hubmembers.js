import mongoose from "mongoose";
const hubMemberSchema = new mongoose.Schema({
  hub_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hub',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  
  
});

//hubMemberSchema.index({ hub_id: 1, user_id: 1 }, { unique: true });

const Hubmembers = mongoose.model('Hubmembers', hubMemberSchema);
export default Hubmembers;