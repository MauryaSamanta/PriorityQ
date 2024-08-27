import express from "express";
import { getchats, makechat } from "../controllers/chat.js";
const app = express.Router();
app.post("/new",makechat);
app.get("/:userid", getchats);

export default app;