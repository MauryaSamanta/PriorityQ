import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { createZone } from "../controllers/zone.js";
const app=express.Router();
app.use(verifyToken);
app.post("/:qubeid/new",createZone);

export default app;