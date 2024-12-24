import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { userRoutes } from "./routes/userRoutes.js"
import { messageRoutes } from "./routes/messageRoutes.js"
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}));

mongoose.connect(process.env.DB)
.then(()=>{
    console.log("DB connected Successfully!")
})
.catch(err=>console.log(err));

app.listen(4000||process.env.PORT,()=>{
     console.log(`Listening at port ${process.env.PORT}`)
});

app.use('/api/auth',userRoutes);
app.use('/api/message',messageRoutes)

