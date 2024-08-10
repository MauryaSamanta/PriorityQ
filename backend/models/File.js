import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      hub_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hub'
      },
      file_url:{
        type:String,
        required:true
      },
      file_name:{
        type:String,
        required:true
      }
  });
  
  const File = mongoose.model('File', fileSchema);
  export default File;