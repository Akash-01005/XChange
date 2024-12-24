import { useState } from "react"
import { Link } from "react-router-dom";
import { Chat, Logo } from "../assets";
import axiosInstance from "../lib/axios";

const SignUpPage = () => {
  const [isShow,setShow] = useState(false);
  const [isCheck,setCheck] =  useState(false);
  const [formData,setFormData] = useState({username:"",email:"",password:""})
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!isCheck){
        alert("Accept terms and conditions")
    }
    else{
      if(!formData.email || !formData.username || !formData.password){
        alert("All fields are required")
      }
      else{
        axiosInstance.post('/auth/signup',formData)
        .then((res)=>{
          console.log(res.data)
        })
        .catch(err=>console.log(err.response.data))
      }
    }

  }
  setTimeout(()=>{

  },1000)
  console.log(formData)

  return (
        <div className="h-screen flex items-center flex-col p-2 lg:flex-row justify-around">
          <div className="flex order-2 mt-0 lg:mt-10 lg:order-1 flex-col basis-2/5 shadow-lg rounded-xl p-5">
            <div className="flex flex-col items-center">
              <img src={Logo} className="h-[100px] w-[100px]" alt="" />
              <h1 className="text-center text-2xl font-bold">Create Account</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input type="text" className="p-2 mt-2 border rounded focus:outline-none" placeholder="enter firstname" onChange={(e)=>{setFormData((prev)=>({...prev,username:e.target.value}))}} />
              <input type="email" className="p-2 mt-2 border rounded focus:outline-none" placeholder="enter email address" onChange={(e)=>{setFormData((prev)=>({...prev,email:e.target.value}))}} />
              <div className="flex mt-2">
               <input type={isShow?'text':'password'} className="mr-3 p-2 w-full border rounded focus:outline-none" placeholder="enter password" onChange={(e)=>setFormData((prev)=>({...prev,password:e.target.value}))} />
               {
                isShow?<span className="bg-red-400 p-2 w-[100px] text-center rounded-md cursor-pointer text-white transition-all hover:bg-red-500" onClick={()=>setShow((prev)=>!prev)}>Hide</span>:<span className="bg-green-400 p-2 w-[100px] text-center text-white cursor-pointer transition-all rounded-md hover:bg-green-500" onClick={()=>setShow((prev)=>!prev)}>Show</span>
               }
              </div>
              <div className="flex mt-2 gap-2 items-center"><input type="checkbox" id="check" onClick={()=>setCheck((prev)=>!prev)}/><label htmlFor="check">I agree to the terms and conditions</label></div>
              <button className="bg-blue-500 transition rounded-md w-full mt-3 p-2 text-white hover:bg-blue-600">Sign Up</button>
            </form>
            <p className="text-center mt-2">Already,have an account? <Link to="/login" className="underline text-blue-800">Login</Link></p>
          </div>
          <div className="flex order-1 lg:order-2 basis-2/5 items-center justify-center flex-col">
               <h1 className="text-3xl text-center font-bold">Xchange</h1>
               <p className="text-center font-medium text-xl mt-3">{`Let’s Chat – Join Xchange Today!`}</p>
               <img src={Chat} className="h-[320px] hidden lg:block w-[320px]" alt="" />
               <p className="text-center">Welcome to Xchange, the app that lets you chat with anyone, anytime. Quick, easy, and built for seamless conversations. Create your account and start chatting now!</p>
          </div>
        </div>
  )
}

export default SignUpPage