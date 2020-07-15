const express = require("express");
const cors = require("cors")
const contactRouter = require("./contact.router")
const morgan = require("morgan")
console.log('contactRouter', contactRouter)
require("dotenv").config()



module.exports = class ContactsServer {
    constructor() {
      this.server = null;
    }

    start() {
      this.initServer();
      this.initMiddlewares();
      this.initRoutes();
      this.startListening()
    }

    initServer() {
      this.server = express();
    }

    initMiddlewares() {
      this.server.use(express.json());
      this.server.use(morgan("tiny"))
      this.server.use(cors({origin:"http://localhost:3000"}))
    }

    initRoutes() {
      this.server.use("/contacts", contactRouter)
    }

    startListening(){
      this.server.listen(process.env.HOST_PORT,()=>{
        console.log("Server started", process.env.HOST_PORT);
      })
    }
}