import express from "express";
import {avatarupload} from "../middlewares/multer.js";
import {updateAvatar} from "../controllers/user.js";
import {verifyToken} from "../middlewares/auth.js";
import {createHub, addMembertoHub, listUsersInHub,getHubs, listQubesInHub, deleteHubs, leaveHub, editHub, editHubDetails, createHubApp, addowners, removeowners} from "../controllers/hub.js";
const app=express.Router();

app.post("/", verifyToken,avatarupload, createHub);
//app.post("/app",verifyToken,createHubApp);
app.post("/:hubid/add", verifyToken, addMembertoHub);
app.delete("/:hubid/member",leaveHub);
app.get("/:hubid/members", verifyToken, listUsersInHub);
app.get("/",verifyToken, getHubs);
app.patch("/:hubid",avatarupload,editHub);
app.patch("/:hubid/settings",avatarupload,editHubDetails);
app.get("/:hubid",verifyToken, listQubesInHub);
app.post("/owners", addowners);
app.post("/removeowners",removeowners);
app.delete("/:hubid",verifyToken, deleteHubs);

export default app;