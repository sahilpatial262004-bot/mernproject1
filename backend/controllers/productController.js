import product from "../models/product.js";
import productModel from "../models/product.js"
import {body,validationResult} from 'express-validator';

let validProduct=[
    body("pname").notEmpty().withMessage("Product name is required")
    .isLength({min:3,max:50}).withMessage("Product name must be between 3 to 50 characters"),
    body("price").notEmpty().withMessage("Price is required")
    .isNumeric().withMessage("Price must be a number")
    .isFloat({min:1,max:100000}).withMessage("Price mustbe between 1 and 100000"),
    body("company").notEmpty().withMessage("Companyis reqquired")
    .isIn(["Apple","Samsung","Sony","Dell","HP","Other"]).withMessage("Invalid company name"),
    body("category").notEmpty().withMessage("Category is required")
    .isIn(["electronic","fashion","grocery","mobile","laptop","other"])
    .withMessage("Invalid category"),
    body("userId")
    .notEmpty().withMessage("user ID is required")
    .isMongoId().withMessage("Invalid user ID format")
]


let addProduct=async(req,res)=>{
    const error=validationResult(req)
    if(!error.isEmpty())
    {
        return res.status(400).json({"message":error.array()})
    }
    try
    {
        let {pname,price,company,category,userId,image}=req.body;
        const imagePath=req.file?req.file.path:null;
        let product=await productModel.create({pname,price,company,category,userId,image:imagePath});
        res.status(200).json({message:"product add successfully",product})
    }
    catch(err)
    {
        res.status(500).json({message:err})
    }
}


let getproduct=async(req,res)=>{
    try
    {
       let product=await productModel.find()
    if(product.length>0)
    {
        res.status(200).json(product)  //models ke ander product.js bale file se
    }
    else
    {
        res.status(400).json({message:"No Product Found"})
    }
    }
    catch(err)
    {
        res.status(500).json({message:err})

    }
}


let deleteproduct=async(req,res)=>{
    try
    {
        let data=await productModel.deleteOne({_id:req.params.id})
        if(data.deletedCount==0)
        {
            return res.status(404).json({message:"No Product Found"})
        }
        else
        {
            return res.status(200).json({message:"Product deleted Successfully"})
        }
    }
    catch(err)
    {
        res.status(500).json({message:err})
    }
}


let editPrifill=async(req,res)=>{
    try
    {
        let priffildata=await productModel.findById(req.params.id);
        if(!priffildata)
        {
            return res.status(404).json({message:"No Product Found"})
        }
        return res.status(200).json({priffildata})
    }
    catch(err)
    {
        res.status(500).json({message:err})
    }
}


let editProduct=async(req,res)=>{
    try
    {
        let productData=await productModel.findByIdAndUpdate(req.params.id,req.body,
            {new:true})
            if(!productData)
            {
                return res.status(404).json({message:"No Products Found"})
            }
            return res.status(200).json({message:"update product successfully",productData})
    }
    catch(err)
    {
        res.status(500).json({message:err})
    }
}

let searchProduct=async (req,res)=>{
    try
    {
        let key=req.params.key;
        let searchData=await productModel.find({
            $or:[
                {pname:{$regex:key,$options:"i"}},
                {company:{$regex:key,$options:"i"}},
                {category:{$regex:key,$options:"i"}}
            ]
        });
        res.status(200).json(searchData)
    }
    catch(err)
    {
        res.status(500).json({message:err})
    }
}

export {addProduct,validProduct,getproduct,deleteproduct,editPrifill,editProduct,searchProduct}