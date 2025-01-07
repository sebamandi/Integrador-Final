const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Crear un transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  // Definir las opciones del email
  const mailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado: ', info.messageId);
  } catch (error) {
    console.error('Error al enviar email:', error);
    // No lanzamos el error para que la aplicación continúe funcionando
    // incluso si el envío de email falla
  }
};

module.exports = sendEmail;