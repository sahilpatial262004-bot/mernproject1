import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {api} from '../components/api'

function SignIn() {
    let [email,setEmail]= useState("")
    let [password,setPassword]= useState("")

    let navigate=useNavigate()

    let handleSignin=async(e)=>{
      e.preventDefault();
    try{
      let {data,status}=await api.post("/user/signin",{email,password})
      console.log(data)
      toast.success(data.message,{autoClose:1000})
      if(status==200)
        {
          localStorage.setItem("user",JSON.stringify(data.user))
          localStorage.setItem("token",JSON.stringify(data.token))

          setTimeout(()=>{
          navigate("/")
          },1500)
        }  
    }
    catch(err)
    {
      toast.error(err.response?.data?.message||"server error")
    }
    }

  return (
    <div>
      <h1>Signin Page</h1>
      <form action="" onSubmit={handleSignin}>
        <input type="email" name="" id="" placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <br /> <br />
        <input type="password" name="" id="" placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <br /> <br />
        <input type="submit" value="Signin" />
      </form>
    </div>
  )
}

export default SignIn