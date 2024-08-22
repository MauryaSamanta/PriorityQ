import express from "express";
import { getlastread, updateunread } from "../controllers/userzone.js";
const app=express.Router();

app.post("/getunread", getlastread);
app.post("/update", updateunread);
export default app;