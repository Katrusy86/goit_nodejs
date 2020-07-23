require("./config");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const { authRouter } = require("./users/auth.router");
const {contactRouter} = require("./contacts/contact.router")
const { MongoClient} = require("mongodb");
require("dotenv").config()
mongoose.set('useFindAndModify', false);

module.exports = class AuthServer {
    constructor() {
      this.server = null;
    }

     async start() {
      this.initServer();
      await this.initDatabaseConnection();
      this.initMiddlewares();
      this.initRoutes();
      this.initErrorHardling();
      this.startListening()
    }

    initServer() {
      this.server = express();
    }

    async initDatabaseConnection() {
      await mongoose.connect(process.env.MONGODB_URL)
    }

    initMiddlewares() {
      this.server.use(express.json());
      this.server.use(cookieParser())
    }

    initRoutes() {
      this.server.use("/contacts", contactRouter)
      this.server.use('/auth', authRouter)
    }

    initErrorHardling() {
      this.server.use((err, req, res, next) => {
        const statusCode = err.status || 500;
        return res.status(statusCode).send(err.message);
      });
    }

    startListening(){
      this.server.listen(process.env.HOST_PORT,()=>{
        console.log("Server started", process.env.HOST_PORT);
      })
    }
}