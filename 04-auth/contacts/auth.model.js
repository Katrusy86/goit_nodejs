const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactsSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  passwordContact: { type: String, required: true },
  token:{ type:String, required: false}
});


exports.Contact = mongoose.model("Contact", contactsSchema);