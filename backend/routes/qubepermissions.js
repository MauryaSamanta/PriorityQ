import express from "express";
import Invites from "../models/Invite.js";
import { verifyToken } from "../middlewares/auth.js";
import { checkstatus, getrequests, processrequests, sendrequest } from "../controllers/qubepermissions.js";

const app=express.Router();
app.post("/sendreq", sendrequest);
app.post("/getreqs", getrequests);
app.post("/process",processrequests)
app.post("/check",checkstatus);
export default app;