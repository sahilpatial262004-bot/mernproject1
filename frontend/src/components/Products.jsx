import React, { useEffect, useState } from 'react'
import {api} from "../components/api"
import {toast} from "react-toastify"
import { Link } from 'react-router-dom'

function Products() {
  let [products,setProducts]=useState([])

  let getApi=async()=>{
    try{
    // let products=await api.get("/product/getProduct");
    // console.log(products)
            // OR

    let {data}=await api.get("/product/getProduct",{
      headers:{
        Authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }  
      });
    console.log(data)
    setProducts(data)
    }
    catch(err)
    {
      toast.error(err.response?.data?.message||"server error")
    }
  }

  let handleDelete=async(id)=>{
    console.log(id)
    try{
      let {data}=await api.delete(`/product/deleteproduct/${id}`,{
      headers:{
        Authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }  
      });
      toast.success(data.message,{autoClose:500})
      if(status==200)
      {
        setTimeout(()=>{
          navigate("/")
        },1000)
      }
      getApi();
    }
    catch(err)
    {
      toast.error(err.response?.data?.message||"somethiing wrong")
    }
  }

  useEffect(()=>{
    getApi();
  },[])

  let handleSearch=async(e)=>{
    let key=e.target.value;
    console.log(key)
    if(key)
    {
      let {data}=await api.get(`/product/searchproduct/${key}`,{
      headers:{
        Authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }  
      })
      // console.log(data)
      setProducts(data)
    }
    else{
      getApi();
    }
  }

  return (
    <div className="productlist">
      <h1>This is Products Page</h1>
      <br /><br />

      <input type="search" name="" id="" placeholder='Enter Name Company Category' onChange={handleSearch}/>
      <br /><br />

      <ul className="list">
        <li>S.No</li>
        <li>Image</li>
        <li>ProductsName</li>
        <li>ProductsPrice</li>
        <li>ProductsCompany</li>
        <li>ProductsCategory</li>
        <li>Delete</li>
        <li>Update</li>
      </ul>
      {products.length>0?products.map((product,idx)=>{
        return(
          <ul className="list" key={product._id}>
            <li>{idx+1}</li>
            <li>{product.image?<img src={product.image} height={100} width={100}/>:"No image"}</li>
            <li>{product.pname}</li>
            <li>{product.price}</li>
            <li>{product.company}</li>
            <li>{product.category}</li>
            <li><button onClick={()=>handleDelete(product._id)}>Delete</button></li>
            <li><Link to={`/edit/${product._id}`}>Update</Link></li>
          </ul>
        )
      }):<h1>No products Found</h1>}
    </div>
  )
}

export default Products