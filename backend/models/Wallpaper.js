import mongoose from "mongoose";

const wallSchema = new mongoose.Schema({
  user_id:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
  },
  hub_id:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Hub'
  },
  wall_url:{
    type:String
  }
});

const Wallpaper = mongoose.model('Wallpaper', wallSchema);
export default Wallpaper;