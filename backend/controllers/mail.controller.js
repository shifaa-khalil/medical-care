const nodemailer = require("nodemailer");

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // e.g., "smtp.gmail.com" for Gmail
  port: 587, // Specify the port based on your SMTP provider
  secure: false, // Set to true if using a secure connection (e.g., SSL/TLS)
  auth: {
    user: "shifaakhalil50@gmail.com", // Your email address
    pass: "nkwtlekkxizwvcnc", // Your email password or app-specific password
  },
});

// Function to send a notification email
exports.sendNotificationEmail = (recipientEmail, subject, content) => {
  const mailOptions = {
    from: "shifaakhalil50@gmail.com", // Sender's email address
    to: recipientEmail, // Recipient's email address
    subject: subject, // Email subject
    text: content, // Plain text body
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
