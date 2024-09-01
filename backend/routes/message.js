import express from "express";
import { deleteMessage, getMessages, messagewithaudio, sendMessagewithFile, sendMessagewithFolder } from "../controllers/message.js";
import { attachmentsMulter, folderMulter, audioMulter } from "../middlewares/multer.js";
const app=express.Router();

app.get("/:zoneid", getMessages);
app.post("/file",attachmentsMulter,sendMessagewithFile);
app.post("/folder",folderMulter,sendMessagewithFolder);
app.post("/audio",audioMulter, messagewithaudio);
app.delete("/:messageid",deleteMessage);
export default app;