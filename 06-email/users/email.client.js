const nodemailer = require("nodemailer");

class EmailClient {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
    });
  }

  async sendVerificationEmail(email, verificationLink) {
    return this.transporter.sendMail({
      to: email,
      from:process.env.NODEMAILER_EMAIL,
      subject:"Please verify your email",
      html:`<a href="${verificationLink}">Click link</a>`,
    });
  }
}

exports.emailClient = new EmailClient();