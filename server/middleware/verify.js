import jwt from "jsonwebtoken"
import userModel from "../model/user.js";

const verify = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
       return res.status(200).json({ status:false ,message: "Please Login!" })
    }
    const decrypt = jwt.verify(token,process.env.JWT);
    const user = await userModel.findOne({ username:decrypt.username })
    req.user = user;
    next();
}

export default verify