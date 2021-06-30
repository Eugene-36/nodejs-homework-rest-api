const nodemailer = require("nodemailer");
const MailGen = require("mailgen");
require("dotenv").config();
class EmailService {
  #sender = nodemailer
  #GenerateTemplate = MailGen
  constructor(env) {
    //  this.nodemailer = sender;
    switch (env) {
      case "development":
        this.link = "https://5cbcb8b76180.ngrok.io";
        break;
      case "production":
        this.link = "https://5cbcb8b76180.ngrok.io";
        break;

       default:
        "https://5cbcb8b76180.ngrok.io";
        break;
    }
  }
  #createTemplateVerificationEmail(verifyToken, name) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: "neopolitan",
      product: {
        name: "System integration",
        link: this.link,
      },
    });
    const email = {
      body: {
        name,
        intro: "Welcome to System integration! ",
        action: {
          instructions:
            "To get started with System integration, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    return mailGenerator.generate(email);
  }
  async sendVerifyEmail(verifyToken, email, name) {
    // const emailHtml = this.#createTemplateVerificationEmail(verifyToken, name);
    // const msg = {
    //   to: email,
    //   subject: "Verify your account",
    //   html: emailHtml,
    // };
    // const result = await this.sender.send(msg);
    // console.log(result);

    const msg = {
      host: 'smtp.meta.ua',
      port: 465,
      secure: true,
      auth: {
        user: 'livandosssss@meta.ua',
        pass: process.env.PASSWORD,
      },
    }
  
    const transporter =  this.#sender.createTransport(msg)

    const emailOptions = {
      from: 'goitnodejs@meta.ua',
      to: email,
      subject: 'Verify email',
      html: this.#createTemplateVerificationEmail(verifyToken, email, name),
    }
    
    await transporter.sendMail(emailOptions)
  }
}
console.log(EmailService)
module.exports = EmailService;




