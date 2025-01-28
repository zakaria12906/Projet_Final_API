// email.service.js
const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Assurez-vous que c'est correct
        pass: process.env.EMAIL_PASS // Utilisez un App Password si nécessaire
      }
    });

    await transporter.sendMail({
      from: `"Nom de votre app" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email.");
  }
};

module.exports = { sendEmail }; // Ajoutez cette ligne pour exporter la fonction