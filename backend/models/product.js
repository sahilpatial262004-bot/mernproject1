import mongoose from "mongoose";

let prodSchema=mongoose.Schema({
    pname:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    }
},
    {timestamps:true}
)

export default mongoose.model("productData",prodSchema)