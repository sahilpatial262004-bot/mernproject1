
import transporter from "./Email.config.js";
import { Verification_Email_Template, Welcome_Email_Template } from "./Verification_Email.js";

export const sendVerficationCode=async(email,verificationCode)=>{
try{
  const info = await transporter.sendMail({
    from: '"Excellence Team" <excellencemadhu@gmail.com>', // sender address
//     to: "sahilpatial262004@gmail.com", // list of recipients
    to: email, // list of recipients
    subject: "verify your Email", // subject line
    text: "verify your email", // plain text body
    html: Verification_Email_Template.replace("{verificationCode}",verificationCode) // HTML body
  });

  console.log("Email send Successfully",info);
}
catch(err){
console.log(err);
}
}




export const welcomeEmail=async(email,name)=>{
try{
  const info = await transporter.sendMail({
    from: '"Excellence Team" <excellencemadhu@gmail.com>', // sender address
//     to: "sahilpatial262004@gmail.com", // list of recipients
    to: email, // list of recipients
    subject: "verify your Email", // subject line
    text: "verify your email", // plain text body
    html: Welcome_Email_Template.replace("{name}",name) // HTML body
  });

  console.log("Email send Successfully",info);
}
catch(err){
console.log(err);
}
}