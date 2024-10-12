import express from "express";
import Request from "../models/Request.js";
import { getreq, sendreq, reqstat } from "../controllers/request.js";
const app=express.Router();
app.post("/create",sendreq);
app.get("/:userid",getreq);
app.get("/:userid/:senderid",reqstat);
//app.post("/:hubid",verifyToken, createInvite);
export default app;