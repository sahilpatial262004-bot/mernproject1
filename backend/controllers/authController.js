import userModel from "../models/auth.js";
import { body,validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import { sendVerficationCode, welcomeEmail } from "../config/Email.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



let validationSignup=[
body("name").isLength({min:2}).withMessage("Name must atleast 2 characters"),
body("email").isEmail().withMessage("Enter valid email"),
body("password").isLength({min:6}).withMessage("Password length must be 6 characters").matches(/[0-9]/).withMessage("Pasword must contain a number")
];



let Signup=async(req,res)=>{
const errors=validationResult(req)
if(!errors.isEmpty())
{
return res.status(400).json({"message":errors.array()[0].msg})
}
try{
let {name,email,password}=req.body;
const exists=await userModel.findOne({email});
if(exists) return res.status(400).json({"message":"Email already registered"});

let hash=await bcrypt.hash(password,10);
let verificationCode=Math.floor((Math.random()*900000)+100000).toString();

const user=await userModel.create({name,email,password:hash,verificationCode});
sendVerficationCode(user.email,verificationCode);
res.status(200).json({message:"User successfully signup"})
}catch(err)
{
res.status(500).json({message:err})
}
}


let VerifyEmail=async(req,res)=>{
try{
let {code}=req.body;
let user=await userModel.findOne({verificationCode:code});
if(!user){
return res.status(400).json({message:"Invalid or expired code",success:false})
}
user.isVerified=true;
user.verificationCode=undefined;
welcomeEmail(user.email,user.name)
await user.save();
return res.status(200).json({message:"Email verified successfully",success:true})
}catch(err){
res.status(500).json({message:err})
}
}

let validationSignin=[
body("email").isEmail().withMessage("Enter Valid Email"),
body("password").notEmpty().withMessage("Password required")
]


let Signin=async(req,res)=>{
const errors=validationResult(req)
if(!errors.isEmpty())
{
return res.status(400).json({"message":errors.array()[0].msg})
}
try{
let {email,password}=req.body;
const exists=await userModel.findOne({email});
// res.send(exists);
if(!exists) return res.status(400).json({"message":"Plz firstly signup"});

let comparePassword=await bcrypt.compare(password,exists.password);
if(!comparePassword) return res.status(400).json({"message":"Password not match"});
const token=jwt.sign(
{id:exists._id,email:exists.email},
process.env.SECRET_KEY,{expiresIn:'900s'})
res.status(200).json({message:"Signin successfull",user:{id:exists._id,name:exists.name,email},token})
}
catch(err){
res.status(500).json({message:err})
}
}

export {Signup,validationSignup,validationSignin,Signin,VerifyEmail};