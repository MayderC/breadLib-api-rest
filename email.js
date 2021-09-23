require("dotenv").config();

const nodeMailer = require('nodemailer');
const PASSWORD = process.env.EMAIL_PASSWORD
const EMAIL = process.env.EMAIL


let transporter = nodeMailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

const mailOptions = {
  from: EMAIL, // sender address
  to:  "drio685@gmail.com",
  subject: "Hola Mayder", // Subject line
  html: '<p>test</p>', // plain text body
 };
 
const send = async()=>{
  await transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err)
    }else{
      console.log("send")
    }
  })
}
send()