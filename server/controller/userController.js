import bcrypt from "bcrypt";
import userModel from "../model/user.js";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";

const signup = async(req,res)=>{
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        return res.status(400).json({ message:"All Fields Are Required!" })
    }
    if(password.length<6){
        return res.status(400).json({ message:"Password Must Contain Atleast 6 Character!"})
    }
    const check = await userModel.findOne({ username:username });
    if(check == null){
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
        const hashPassword = await bcrypt.hash(password,salt);
        const newUser = { username:username, email:email, password:hashPassword };
        await userModel.create(newUser);
        return res.status(201).json({ status:true, message:"User Created Successfully.." });
    }
    else{
        return res.status(401).json({ status:false ,message:"User Already Exists!" });
    }
}

const login = async(req,res)=>{
    const { email, password } = req.body;
    const check = await userModel.findOne({ email:email });
    if(check != null){
        const compare = await bcrypt.compare(password,check.password);
        if(!compare){
           return res.status(200).json({ status:false, message:"Incorrect Password!" });
        }
        const token = jwt.sign({ username:check.username },process.env.JWT,{ expiresIn:'1h' });
        res.cookie("user",token,{ httpOnly:true,maxAge:24*36000 });
        return res.status(200).json({ status:true, message: "Login Successfull.." });
    }
    else{
       return res.status(401).json({ status:true, message: "Invalid User!" });
    }

}

const logout = async(req,res)=>{
        res.clearCookie('user',{ httpOnly:true });
        return res.status(200).json({ status:true, message:"Logout Successfull.." });
}

const findUser = async(req,res)=>{
    const { email }  = req.body;
    const check = await userModel.findOne({ email:email });
    if(check == null){
        return res.status(404).json({ status:false,message:"User Doesn't Exists!" });
    }
    else{
        return res.status(200).json(check);
    }
}

const update = async(req,res)=>{
   const { id }= req.params;
   const check = await userModel.findById({ _id:id });
   if(check != null){
    const { password } = req.body;
    if(password.length<6){
        return res.status(400).json({message:"Password Must Contain Atleast 6 Character!"})
    }
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
    const hashPassword  = await bcrypt.hash(password,salt);
    await userModel.findOneAndUpdate({ email:check.email },{ password:hashPassword });
    return res.status(202).json({ status:true,message:"Password Updated Successfully..." });
   }
   else{
    return res.status(404).json({ status:false,message:"User Doesn't Exists!" });
   }
}

const UpdateProfile = async(req,res)=>{
    const { profilePic } = req.body;
    const userid = req.user._id;
    if(!profilePic){
        return res.status(400).json({ message:"Profile Picture is Required!" })
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await userModel.findByIdAndUpdate(userid,{ profilePic:uploadResponse.secure_url })
    return res.status(200).json(updatedUser)
}

const checkAuth = async(req,res)=>{
    return res.status(200).json({status:true,message:'Authenticated User'})
}

export { signup, login, logout, findUser, update , UpdateProfile, checkAuth}

