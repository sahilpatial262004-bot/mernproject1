import mongoose from "mongoose";

let userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationCode:String
},{timestamps:true})

let userModel=mongoose.model("auth",userSchema);

export default userModel;