import express from "express";
import Request from "../models/Request.js";
import { getreq, sendreq } from "../controllers/request.js";
const app=express.Router();
app.post("/create",sendreq);
app.get("/:userid",getreq);
//app.post("/:hubid",verifyToken, createInvite);
export default app;