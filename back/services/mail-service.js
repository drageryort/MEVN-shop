const nodemailer = require("nodemailer")

class MailService {

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
     }
    })
  }

  async sendActivationMail (to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активация аккаунта ${process.env.URL}`,
      text: '',
      html:
        `
          <div>
            <h1>Для активации перейдите, пожалуйста, по ссылке ниже</h1>
            <a href="${link}">Ссылка для активации</a>
          </div>
        `
    })
  }
}

module.exports = new MailService()