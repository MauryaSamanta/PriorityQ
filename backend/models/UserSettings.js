import mongoose from "mongoose";
const userSettingsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  setting_key: {
    type: String,
    required: true,
    maxlength: 255
  },
  setting_value: {
    type: String,
    required: true
  }
}, { _id: false });

//userSettingsSchema.index({ user_id: 1, setting_key: 1 }, { unique: true });

module.exports = mongoose.model('UserSetting', userSettingsSchema);
