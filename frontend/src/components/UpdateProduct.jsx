import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import {api} from '../components/api'
import {toast} from 'react-toastify'

function UpdateProduct() {
    const [formData,setFormData]=useState({
      pname:"",
      price:"",
      company:"",
      category:""
    })

    let navigate=useNavigate();

    let {id} = useParams();
    // let param = useParams();
    // console.log(param);


    let prefillApi=async()=>{
      let {data}=await api.get(`/product/editprifill/${id}`,{
        headers:{
        Authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }  
      });
      let {priffildata}=data;
      console.log(priffildata)
      setFormData(priffildata);
      // console.log(data)
    }

    useEffect(()=>{
      prefillApi();
    },[id])

    const handleChange=(e)=>{
      setFormData({
        ...formData,
        [e.target.name]:e.target.value
      })
    }

    const handleUpdate=async(e)=>{
      e.preventDefault();

       try
          {
            let {data,status}=await api.put(`/product/editproduct/${id}`,formData,{
              headers:{
        Authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }  
            })
            // console.log(res)
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
      <h1>Update Page</h1>

            <form action="" onSubmit={handleUpdate}>
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

        <input type="submit" value="Add Product" />

      </form>
    </div>
  )
}

export default UpdateProduct;