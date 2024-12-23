import express from "express";
import { checkAuth, findUser, login, logout, signup, update, UpdateProfile } from "../controller/userController.js";
import verify from "../middleware/verify.js";

const routes = express.Router();

routes.post('/signup',signup);
routes.get('/login',login);
routes.delete('/logout',verify,logout);
routes.get('/finduser',findUser)
routes.put('/update/:id',update)
routes.put('/updateProfile',UpdateProfile)
routes.get('/check',verify,checkAuth)

export { routes as userRoutes }