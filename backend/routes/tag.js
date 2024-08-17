import express from "express";
import { messages, tags } from "../controllers/tag.js";

const app=express.Router();

app.get("/:qubeid",tags);
app.post("/message/:qubeid",messages);

export default app;