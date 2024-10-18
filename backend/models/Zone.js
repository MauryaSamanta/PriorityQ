import mongoose from "mongoose";

const zoneSchema = new mongoose.Schema({
  qube_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Qube',
    required: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 255
  },
  symmkey:{
    type:String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Zone = mongoose.model('Zone', zoneSchema);
export default Zone;