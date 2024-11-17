import express from "express";
import { deleteMessage, getMessages, getmessageswithfilesinqube, messagewithaudio, sendMessagewithFile, sendMessagewithFolder, sendMessagewithVideo } from "../controllers/message.js";
import { attachmentsMulter, folderMulter, audioMulter } from "../middlewares/multer.js";
const app=express.Router();

app.get("/:zoneid", getMessages);
app.post("/file",attachmentsMulter,sendMessagewithFile);
app.post("/video",attachmentsMulter,sendMessagewithVideo);
app.post("/folder",folderMulter,sendMessagewithFolder);
app.post("/audio",audioMulter, messagewithaudio);
app.get("/getqube/:qubeid",getmessageswithfilesinqube);
app.delete("/:messageid",deleteMessage);
export default app;