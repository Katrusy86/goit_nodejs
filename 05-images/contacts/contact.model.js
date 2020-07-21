const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactsSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  avatarURL: {type:String}
});

exports.Contact = mongoose.model("Contact", contactsSchema);