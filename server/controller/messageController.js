import cloudinary from "../lib/cloudinary.js";
import messageModel from "../model/message.js";
import userModel from "../model/user.js";

const getusersForSidebar = async(req,res)=>{
    const loggedInUser = req.user._id;
    const filteredUser = await userModel.find({_id:{$ne:loggedInUser}})
    return res.status(200).json(filteredUser)
}

const getMessage = async(req,res)=>{
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await messageModel.find({$or:[
        { senderId:myId, receiverId:userToChatId },
        { senderid:userToChatId, recieverId:myId }
    ]});

    return res.status(200).json(messages)
}

const sendMessage = async(req,res)=>{
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    
    let imgUrl;
    if(image){
        const uploadImg = await cloudinary.uploader.upload(image)
        imgUrl = uploadImg.secure_url
    }

    const newMessage = new Message({ senderId,receiverId,text,image:imgUrl });
    await newMessage.save();


}

export { getusersForSidebar, getMessage, sendMessage }