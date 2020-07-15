const jwt = require("jsonwebtoken");
const { Contact } = require("./auth.model");
require("dotenv").config()

exports.authorizationCookies = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader.replace("Bearer", "");
const token = req.cookies.token

  let payload
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).send("Not authorized");
  }

  const contact = await Contact.findById(payload.id)

  req.contact=contact;
  next()
};
