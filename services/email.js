const MailGen = require("mailgen");
require("dotenv").config();

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case "development":
        this.link = "http://localhost:3000";
        break;
      case "production":
        this.link = "link for production";
        break;

      default:
        "http://localhost:3000";
        break;
    }
  }
  #createTemplateVerificationEmail(verifyToken, name) {
    const mailGenerator = new Mailgen({
    theme: 'neopolitan',
    product: {
        name: 'System integration',
        link: this.link
    }
    })
    const email = {
    body: {
        name,
        intro: 'Welcome to System integration! ',
        action: {
            instructions: 'To get started with System integration, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Confirm your account',
                link: `${this.link}/api/users/verify/${verifyToken}`,
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
    };
    return mailGenerator.generate(email)
  }
  async sendVerifyEmail(verifyToken,email,name)
}

module.exports = EmailService