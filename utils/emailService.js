const nodemailer = require("nodemailer");

// Create a transporter using your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nakshatragarg54321@gmail.com",
    pass: "aovynmnchbixrivn",
  },
});

// Function to send email using Nodemailer
const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: '"Government" <nakshatragarg54321@gmail.com>',
      to: to,
      subject: subject,
      text: text,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
