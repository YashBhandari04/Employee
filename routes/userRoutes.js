import express from "express";
import { createUser, getUsers } from "../controller/usercontroller.js";

const UserRouter = express.Router();

UserRouter.post("/", createUser);  
UserRouter.get("/", getUsers);      

export default UserRouter;