const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  passwordContact: { type: String, required: true },
  token:{ type:String, required: false},
  avatarURL: {type:String, required: false}
});


exports.User = mongoose.model("User", usersSchema);