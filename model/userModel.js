import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{
         type: String,
         required:true
         
    },
    email:{
        type: String,
        required:true
        
   },
   password:{
    type: String,
    required:true
    
   },
   task:[
    {
     _id:{type:Number},
     tittle:{type:String},
     complete:{type:Number,default:0}}
   ]

})

const User = mongoose.model('User',userSchema)

export default User