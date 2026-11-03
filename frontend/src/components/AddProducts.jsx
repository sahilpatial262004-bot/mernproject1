import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { api } from './api'
import { toast } from "react-toastify"

function AddProducts() {
  const [formData,setFormData]=useState({
    pname:"",
    price:"",
    company:"",
    category:""
  })
  let [image,setImage]=useState(null)

  const navigate=useNavigate();
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleChangeImage=(e)=>{   // cloudinary work 
    setImage(e.target.files[0])
  }

  let userId=JSON.parse(localStorage.getItem("user")).id;

  let Data=new FormData();
  Data.append("pname",formData.pname)
  Data.append("price",formData.price)
  Data.append("category",formData.category)
  Data.append("company",formData.company)
  Data.append("userId",userId)
  if(image)
  {
    Data.append("image",image)
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    // console.log(userId)
    try
    {
      // let {data,status}=await api.post("/product/addproduct",{...formData,userId})
      // console.log(res)
      let {data,status}=await api.post("/product/addproduct",Data,{
      headers:{
        Authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }  
      })
      console.log(data,status)
      toast.success(data.message,{autoClose:1000})
      if(status==200)
      {
        setTimeout(()=>{
          navigate("/")
        },1500)
      }
    }
    catch(err)
    {
      console.log(err.response.data.message)
      if(err.response?.data?.message)
      {
        err.response.data.message.forEach((error)=>{
          toast.error(error.msg||"server error")
        })
      }
      else
      {
        toast.error(err.response?.data?.message||"server error")
      }
    }
  }
  return (
    <div>
      <h1>Add Product Page</h1>

      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="pname" id="" placeholder='Enter Product Name' value={formData.pname} onChange={handleChange}/>
        <br /><br />

        <input type="number" name="price" id="" placeholder='Enter Price' value={formData.price} onChange={handleChange}/>
        <br /><br />

        <input list='company' name='company' placeholder='Select Company Name' value={formData.company} onChange={handleChange}/>
        <datalist id='company'>
          <option value="Apple"/>
          <option value="Samsung"/>
          <option value="Sony"/>
          <option value="Dell"/>
          <option value="HP"/>
          <option value="Other"/>
        </datalist>
        <br /><br />

        <input list='category' name='category' placeholder='Select Category' value={formData.category} onChange={handleChange}/>
        <datalist id='category'>
          <option value="electronics"/>
          <option value="fashion"/>
          <option value="grocery"/>
          <option value="mobile"/>
          <option value="laptop"/>
          <option value="other"/>
        </datalist>
        <br /><br />
        <br /><br />
        <input type="file" name="image" id="" accept="image/*" onChange={handleChangeImage} required/>

        <input type="submit" value="Add Product" />

      </form>
    </div>
  )
}

export default AddProducts