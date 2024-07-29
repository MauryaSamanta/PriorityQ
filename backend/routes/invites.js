import express from "express";
import Invites from "../models/Invite.js";
import { verifyToken } from "../middlewares/auth.js";
import { createInvite, getInvite } from "../controllers/invites.js";
const app=express.Router();


app.post("/:user_id/add", getInvite);
app.post("/:hubid",verifyToken, createInvite);
export default app;