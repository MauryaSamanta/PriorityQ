// routes/userRoutes.js
import express from "express";
import {avatarupload} from "../middlewares/multer.js";
import {updateAvatar} from "../controllers/user.js";
import {verifyToken} from "../middlewares/auth.js";
import { getUser } from "../controllers/user.js";
const app = express.Router();
//console.log("hello");
app.get("/:userId",getUser);
app.patch("/:userId/avatar", avatarupload, updateAvatar);

export default app;
