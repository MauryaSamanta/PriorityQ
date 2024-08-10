import express from "express";
import { getFiles, saveFile } from "../controllers/file.js";
import { verifyToken } from "../middlewares/auth.js";
const app=express.Router();

app.post("/new",verifyToken, saveFile);
app.get("/:hubid",verifyToken,getFiles);
export default app;