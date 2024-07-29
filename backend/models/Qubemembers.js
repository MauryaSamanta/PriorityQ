import mongoose from "mongoose";
const qubeMemberSchema = new mongoose.Schema({
  qube_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hub',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
});

//hubMemberSchema.index({ hub_id: 1, user_id: 1 }, { unique: true });

const Qubemembers = mongoose.model('Qubemembers', qubeMemberSchema);
export default Qubemembers;