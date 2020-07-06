const { Router } = require("express");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi)
const { validate } = require("./validate");
const {createContact, getContacts, getContact, updateContact, deleteContact} = require("./contacts.controller")

const router = Router();

const ContactIdSchema = Joi.object({
    id: Joi.objectId()
})

const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
})

const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
}).min(1);

router.post("/",validate(createContactSchema), createContact)
router.get("/", getContacts)
router.get("/:id", validate(ContactIdSchema, 'params'), getContact)
router.put("/:id", validate(ContactIdSchema, 'params'), validate(updateContactSchema), updateContact)
router.delete("/:id", validate(ContactIdSchema, 'params'), deleteContact)


exports.contactRouter = router;