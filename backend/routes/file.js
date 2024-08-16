import express from "express";
import { addfiletofolder, deleteFiles, getFiles, saveFile } from "../controllers/file.js";
import { verifyToken } from "../middlewares/auth.js";
const app=express.Router();

app.post("/new",verifyToken, saveFile);
app.get("/:hubid",verifyToken,getFiles);
app.patch("/:fileid/:folderid",addfiletofolder);
app.delete("/:fileid",deleteFiles);
export default app;