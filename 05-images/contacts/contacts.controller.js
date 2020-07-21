const { Contact } = require("./contact.model")

exports.createContact = async (req, res, next) =>{
  const newContact = await Contact.create(req.body)
 return res.status(201).send(newContact);
};


exports.getContacts = async (req, res, next) =>{
  const contacts = await Contact.find()
 return res.status(200).send(contacts);
};


exports.getContact = async (req, res, next) =>{
  const {id} = req.params;
  const contact = await Contact.findById(id)
  if(!contact){
    return res.status(404).send('User does not exist')
  }
 return res.status(200).send(contact);
};


exports.updateContact = async (req, res, next) =>{
  const {id} = req.params;
  const updateContact = await Contact.findByIdAndUpdate(id, {$set:req.body}, {new:true})
  if(!updateContact){
    return res.status(404).send('User does not exist')
  }
 return res.status(200).send(updateContact);
};

exports.deleteContact = async (req, res, next) =>{
  const deleteContact = await Contact.findByIdAndDelete(req.params.id)
  if(!deleteContact){
    return res.status(404).send('User does not exist')
  }
 return res.status(204).send(deleteContact);
};