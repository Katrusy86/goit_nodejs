const express = require("express");
const ContactController = require("./contacts.controller")

const contactRouter = express.Router();

contactRouter.get("/", ContactController.listContacts)
contactRouter.get("/:id", ContactController.getById)
contactRouter.post("/", ContactController.validateAddContact, ContactController.addContact)
contactRouter.put("/:id", ContactController.validateUpdateContact, ContactController.updateContact)
contactRouter.delete("/:id", ContactController.deleteContact)

console.log('contactRouter', contactRouter)

module.exports = contactRouter 
