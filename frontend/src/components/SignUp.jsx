import React, { useState } from 'react'
import {api} from './api'
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom'


function SignUp() {
  let [name,setName]= useState("")
  let [email,setEmail]= useState("")
  let [password,setPassword]= useState("")

  let navigate=useNavigate();
  let handleSignup=async(e)=>{
    e.preventDefault();
    try{
      // let result=await api.post("/user/signup",{name,email,password})  //old version
      // console.log(result)

       //{data} ko destucture keya ha because result variable ke ander data mil rha ha jb hm result ko clg me check kr rha hu
      let {data,status}=await api.post("/user/signup",{name,email,password})   // api.post jo ha bo api.js bale file ke ander api se aa rha ha.
      console.log(data)
      toast.success(data.message,{autoClose:1000})
      if(status==200)
        {
          // setTimeout(()=>{
          // navigate("/signin")
          // },1500)

           setTimeout(()=>{
           navigate("/verifyemail")
           },1500)
        }  
    }
    catch(err)
    {
      toast.error(err.response?.data?.message||"server error")
    }
   
  }


  return (
    <div className='form1'>
      <h1>SignUp Page</h1>
      <form action="" onSubmit={handleSignup}>
        <input type="text" name="" id="" placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <br /> <br />
        <input type="email" name="" id="" placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <br /> <br />
        <input type="password" name="" id="" placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <br /> <br />
        <input type="submit" value="Signup" />
      </form>
    </div>
  )
}

export default SignUp
