import mongoose from "mongoose";

const hubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255
  },
  description: {
    type: String
  },
  owner_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  avatar_url: {
    type: String
  },
  banner_url:{
    type:String
  },
  status:{
    type:String
  },
  demonym:{
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

const Hub = mongoose.model('Hub', hubSchema);
export default Hub;