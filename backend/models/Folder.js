import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      hub_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hub'
      },
      name_folder:{
        type:String,
        required:true
      },
      folder:[
       { file_name: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      }}
      ],
      
  });
  
  const Folder = mongoose.model('Folder', folderSchema);
  export default Folder;