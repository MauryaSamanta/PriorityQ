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
      qube_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Qube'
      },
      file_url:{
        type:String,
        
      },
      file_name:{
        type:String,
        
      },
      name_folder:{
        type:String,
        
      },
      folder:[
       { file_name: {
        type: String,
        
      },
      file_url: {
        type: String,
        
      }}
      ],
  });
  
  const File = mongoose.model('File', fileSchema);
  export default File;