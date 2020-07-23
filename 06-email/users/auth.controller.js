const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config()
const uuid = require("uuid")
const { User } = require('../users/auth.model')
const { emailClient } = require('./email.client')

const saltRounds = 5

exports.register = async (req, res, next) => {
  const { email, username, password } = req.body;

  const existContact = await User.findOne({email});
  if (existContact) {
    return res.status(409).send('Email in use')
  }

  const passwordContact = await bcryptjs.hash(password, saltRounds)

  const newContact = await User.create({
    username,
    email,
    passwordContact,
    verificationToken:uuid.v4()
  }) 

  await sendVerificationEmail(newContact)

  return res.status(201).send({
    id:newContact._id,
    username,
    email
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

    if(user.verificationToken){
      return res.status(401).send('User is not verified')
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

  exports.checkUser = async (req, res) => {
    const {verificationToken} = req.params
    const user = await User.findOneAndUpdate({verificationToken}, {verificationToken:null})
    if(user){
      return res.status(200).send('User is verified')
    }
      return res.status(404).send('User not found')
    }

  
  async function sendVerificationEmail(user) {
    const { email, verificationToken } = user;
    const verificationLink = `${process.env.SERVER_BASE_URL}/auth/verify/${verificationToken}`;
    await emailClient.sendVerificationEmail(email, verificationLink);
  }