
const Joi = require("joi")
const uuid = require("uuid")
const path = require("path");
const contactsPath = require(path.join(__dirname, "./db/contacts.json"));


class ContactController {
  listContacts(req, res, next) {
      return res.json(contactsPath)
    }
    
    getById(req, res, next) {
      const { id }= req.params;
      const getContactId = contactsPath.find(contact=>contact.id === id);
      if(!getContactId) {
        return res.status(404).send(`Not found ${id}`)
      }
      return res.status(200).send(getContactId)
    }
    

   validateAddContact(req, res, next){
      const addContactRules = Joi.object({
        name:Joi.string().required(),
        email:Joi.string().required(),
        phone:Joi.string().required(),
      })

      const result = Joi.validate(req.body, addContactRules)
      if(result.error){
        return res.status(400).send("Missing required name field")
      }

      next()
   }

   addContact(req, res, next) { 
    const id = uuid.v4()
    const newContact = {
     ...req.body,
     id,
   } 
   contactsPath.push(newContact);
   console.log('contactsPath', contactsPath)
   return res.status(201).json(newContact);

  }

   validateUpdateContact(req, res, next){
    const updateContactRules = Joi.object({
      name:Joi.string(),
      email:Joi.string(),
      phone:Joi.string(),
    }).min(1)

    const resultUpdate = Joi.validate(req.body, updateContactRules)
    if(resultUpdate.error){
      return res.status(400).send("Missing fields")
    }
    next()
 }

 updateContact(req, res, next) {
  const { id }= req.params;
  const updateContactId = contactsPath.findIndex(contact=>contact.id === id);
  if(!updateContactId) {
    return res.status(404).send(`Not found ${id}`)
  }
  contactsPath[updateContactId] = {
    ...contactsPath[updateContactId],
    ...req.body
  }

  console.log('contactsPath', contactsPath)
  return res.status(200).send()
 }


 deleteContact(req, res, next) {
   const {id} = req.params   
   const deleteContactId = contactsPath.find(contact=>contact.id === id);
   contactsPath.splice(deleteContactId, 1)
   console.log('contactsPath', contactsPath)
   if(!deleteContactId) {
    return res.status(404).send(`Not found ${id}`)
  }
   return res.status(200).json("Contact deleted")
 }

}

module.exports = new ContactController()
