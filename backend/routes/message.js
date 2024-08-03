import express from "express";
import { getMessages } from "../controllers/message.js";
const app=express.Router();

app.get("/:zoneid", getMessages);

export default app;