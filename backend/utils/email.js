const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Configure your SMTP server or service here
  host: 'smtp.example.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your_email@example.com',
    pass: 'your_email_password',
  },
});

async function sendEmail(to, subject, text, html) {
  const mailOptions = {
    from: '"Medi_Connect" <no-reply@medi-connect.com>',
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = { sendEmail };
