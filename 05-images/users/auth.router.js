const { Router } = require('express');
const Joi = require('@hapi/joi');
const { register, getCurrentContact, logOut } = require('../users/auth.controller')
const { logIn } = require('../users/auth.controller')
const { validate } = require('../helper/validate');
const { authorizationCookies } = require('./auth.middleware');
const router = Router();
const path = require("path")
const multer = require("multer");
const fs = require('fs');
const Avatar = require('avatar-builder');

const generalAvatar = Avatar.builder(Avatar.Image.margin(Avatar.Image.circleMask(Avatar.Image.identicon())), 128, 128);
generalAvatar.create('gabriel').then(buffer => fs.writeFileSync('tmp/avatar-gabriel.png', buffer))

const storage = multer.diskStorage({
    destination:process.env.STATIC_BASE_PATH,
    filename:(req, file, callback) =>{
        const {ext} = path.parse(file.originalname);
        return callback(null, Date.now() + ext)
    }
  })
  const upload = multer({ storage })

const regicterSchema = Joi.object({
    username:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
})
const avatarSchema = Joi.object().required()
router.post('/register', upload.single("avatar"), validate(regicterSchema), validate(avatarSchema, "file"), register)

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