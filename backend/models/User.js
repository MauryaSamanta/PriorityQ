import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255
  },
  password_hash: {
    type: String,
    required: true,
    maxlength: 255
  },
  bio:{
    type:String,
    
    maxlength:1000
  },
  avatar_url: {
    type: String
  },
  dob:{
    type:String
  },
  pushtoken:{
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

const User = mongoose.model('User', userSchema);
export default User;