import express from "express";
import { getMessage, getusersForSidebar, sendMessage } from "../controller/messageController.js";
import verify from "../middleware/verify.js";

const routes = express.Router();

routes.get('/users',verify,getusersForSidebar);
routes.get('/:id',verify,getMessage)
routes.post('/send/:id',verify,sendMessage)


export { routes as messageRoutes }