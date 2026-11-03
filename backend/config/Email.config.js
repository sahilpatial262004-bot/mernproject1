import nodemailer from "nodemailer";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user:"sahilpatial262004@gmail.com",
    pass:"katk ihoo dvvk spqv",
  },
});
export default transporter