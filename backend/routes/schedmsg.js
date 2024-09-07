import express from "express";
import {avatarupload} from "../middlewares/multer.js";
import {updateAvatar} from "../controllers/user.js";
import {verifyToken} from "../middlewares/auth.js";
import { createschedmsg } from "../controllers/schedmsg.js";
const app=express.Router();

app.post("/",  createschedmsg);


export default app;