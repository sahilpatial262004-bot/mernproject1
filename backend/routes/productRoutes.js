import {Router} from 'express';
import { addProduct, getproduct, validProduct, deleteproduct, editPrifill, editProduct, searchProduct} from '../controllers/productController.js';

import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken';


let productRouter=Router();

cloudinary.config({
    cloud_name:'gldtiyxo',
    api_key:'535774212574316',
    api_secret:'OgR30tPblJOniJpvoP5VAk_PgoQ'
})

let storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'product',
        allowed_format:['jpg','png','jpeg']
    }
})

const upload=multer({storage:storage});


const verifyToken=async(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;
        if(!authHeader)return res.status(400).json
({"message":"Token not found"});
const token=authHeader.split  (' ')[1];
console.log(token) 
if(!token)return res.status(400).json({"messsage":"unauthorized"});

const decode=jwt.verify(token,process.env.SECRET_KEY)
req.user=decode;
next()
}

catch(err){
    return res.status(401).json({"message":err})
}
}

productRouter.post("/addproduct",verifyToken,upload.single("image"),validProduct,addProduct,)
productRouter.get("/getproduct",verifyToken,getproduct)
productRouter.delete("/deleteproduct/:id",verifyToken,deleteproduct)
productRouter.get("/editprifill/:id",verifyToken,editPrifill)
productRouter.put("/editproduct/:id",validProduct,verifyToken,editProduct)
productRouter.get("/searchproduct/:key",verifyToken,searchProduct)
export default productRouter;