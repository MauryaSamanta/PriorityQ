// routes/userRoutes.js
import express from "express";
import {avatarupload} from "../middlewares/multer.js";
import { changewall, getwall } from "../controllers/wallpaper.js";
import {verifyToken} from "../middlewares/auth.js";

const app = express.Router();

app.patch("/:hubid", avatarupload, changewall);
app.get("/:userid/:hubid",getwall);

export default app;
