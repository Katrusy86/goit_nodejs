const { Router } = require('express');
const Joi = require('@hapi/joi');
const { register, getCurrentContact, logOut } = require('../users/auth.controller')
const { logIn } = require('../users/auth.controller')
const { validate } = require('../helper/validate');
const { authorizationCookies } = require('./auth.middleware');
const router = Router();

const regicterSchema = Joi.object({
    username:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
})
router.post('/register', validate(regicterSchema), register)

const loginSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required(),
})


router.post('/login', validate(loginSchema), logIn)

router.get('/current', authorizationCookies, getCurrentContact)


const logOutSchema = Joi.object({
    email:Joi.string().email().required(),
})

router.get("/logout", validate(logOutSchema), logOut)

exports.authRouter = router;