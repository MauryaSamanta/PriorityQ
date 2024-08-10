import express from "express";
import { getMessages, sendMessagewithFile } from "../controllers/message.js";
import { attachmentsMulter } from "../middlewares/multer.js";
const app=express.Router();

app.get("/:zoneid", getMessages);
app.post("/file",attachmentsMulter,sendMessagewithFile);
export default app;