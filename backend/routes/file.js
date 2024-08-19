import express from "express";
import { addfiletofolder, createfolder, deleteFiles, getFiles, getFilesUser, saveFile } from "../controllers/file.js";
import { verifyToken } from "../middlewares/auth.js";
const app=express.Router();

app.post("/new",verifyToken, saveFile);
app.post("/:hubid/:foldername/:id",createfolder);
app.get("/:hubid",verifyToken,getFiles);
app.post("/:userid",getFilesUser);
app.patch("/:fileid/:folderid",addfiletofolder);
app.delete("/:fileid",deleteFiles);
export default app;