const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config()
const { User } = require('../users/auth.model')

const saltRounds = 5

exports.register = async (req, res, next) => {
  const { email, username, password } = req.body;
  const {filename} = req.file
  const existContact = await User.findOne({email});
  if (existContact) {
    return res.status(409).send('Email in use')
  }

  const passwordContact = await bcryptjs.hash(password, saltRounds)

  const newContact = await User.create({
    username,
    email,
    passwordContact,
    avatarURL:filename
  }) 

  return res.status(201).send({
    id:newContact._id,
    username,
    email,
    avatarURL:`${process.env.SERVER_BASE_URL}/${process.env.STATIC_BASE_URL}/${filename}`
  })
}

exports.logIn = async (req, res, next) => {
    const { email, password } = req.body;
  
    const contact = await User.findOne({email});
    if (!contact) {
      return res.status(400).send('Ошибка от Joi или другой валидационной библиотеки')
    }
  
    const passwordValid = await bcryptjs.compare(password, contact.passwordContact)
    if(!passwordValid) {
      return res.status(401).send('Email or password is wrong')
    }

    const token = jwt.sign({id:contact._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
    res.cookie('token', token, {httpOnly:true})
    return res.status(200).send({token})
  }

  exports.getCurrentContact = (req, res) => {
    return res.status(200).send(req.contact)
  }

  exports.logOut = async (req, res, next) =>{
    const { email} = req.body;
      await Contact.findOne({email})
      return res.status(204).send("No Content")

  }