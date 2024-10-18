import mongoose from "mongoose";
const qubepermissionsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hub_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hub',
    required: true
  },
  qube_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Qube',
    required: true
  },
 
  
});

//hubMemberSchema.index({ hub_id: 1, user_id: 1 }, { unique: true });

const QubePermissions = mongoose.model('qubepermissions', qubepermissionsSchema);
export default QubePermissions;