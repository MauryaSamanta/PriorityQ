import mongoose from "mongoose";
const qubeSchema = new mongoose.Schema({
  hub_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hub',
    required: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 255
  },
  nickname:{
    type:String,
    required:true
  },
  access:{
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

const Qube = mongoose.model('Qube', qubeSchema);
export default Qube;