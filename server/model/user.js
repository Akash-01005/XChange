import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    profilePic:{
        type:String,
        default:""
    }
    
});

const userModel = mongoose.model('User',userSchema);


export default userModel;