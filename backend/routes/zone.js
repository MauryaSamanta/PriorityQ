import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { createZone, getkey } from "../controllers/zone.js";
const app=express.Router();
app.use(verifyToken);
app.post("/:qubeid/new",createZone);
app.get("/:zoneid",getkey);
export default app;