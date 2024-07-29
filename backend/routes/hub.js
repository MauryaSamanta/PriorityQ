import express from "express";
import {avatarupload} from "../middlewares/multer.js";
import {updateAvatar} from "../controllers/user.js";
import {verifyToken} from "../middlewares/auth.js";
import {createHub, addMembertoHub, listUsersInHub,getHubs, listQubesInHub} from "../controllers/hub.js";
const app=express.Router();

app.post("/", verifyToken,avatarupload, createHub);
app.post("/:hubid/add", verifyToken, addMembertoHub);
app.get("/:hubid/members", verifyToken, listUsersInHub);
app.get("/",verifyToken, getHubs);
app.get("/:hubid",verifyToken, listQubesInHub);
export default app;