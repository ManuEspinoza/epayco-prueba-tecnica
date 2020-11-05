const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'rafael35@ethereal.email',
        pass: 'BfhXYuPeP2gZr7m3kx'
    }
});

const sendEmail = async (email, name, codigo) => {
    let info = await transporter.sendMail({
        from: "Billetera Virtual",
        to: `${email}`,
        subject: `${name} por favor confirme su pago`,
        text: "Codigo",
        html: `<b>El codigo para confirmar su pago es: ${codigo}</b>`,
      });
    return info;
}

module.exports = sendEmail;