import express from "express";
import { getMessages, sendMessagewithFile, sendMessagewithFolder } from "../controllers/message.js";
import { attachmentsMulter, folderMulter } from "../middlewares/multer.js";
const app=express.Router();

app.get("/:zoneid", getMessages);
app.post("/file",attachmentsMulter,sendMessagewithFile);
app.post("/folder",folderMulter,sendMessagewithFolder);
export default app;