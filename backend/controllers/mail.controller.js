const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "shifaakhalil50@gmail.com",
    pass: "nkwtlekkxizwvcnc",
  },
});

exports.sendNotificationEmail = (recipientEmail, subject, content) => {
  const mailOptions = {
    from: "shifaakhalil50@gmail.com",
    to: recipientEmail,
    subject: subject,
    text: content,
    //     html: `
    //     <a href="" style="text-decoration: none;">Login</a>
    //   `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
