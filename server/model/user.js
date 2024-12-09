import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is Required."],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is Required."],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is Required."],
        unique:true
    },
    
})

const userModel = mongoose.model(userSchema,'user')


export default userModel