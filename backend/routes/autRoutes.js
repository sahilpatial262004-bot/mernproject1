import { Router } from "express";
import { Signin, Signup, validationSignin, validationSignup, VerifyEmail } from "../controllers/authController.js";



let userRouter=Router();

userRouter.post("/signup",validationSignup,Signup)
userRouter.post("/signin",validationSignin,Signin)
userRouter.post("/verifyemail",VerifyEmail)

export default userRouter;