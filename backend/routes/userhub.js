import express from "express";
import { getdetails, update } from "../controllers/userhub.js";

const app=express.Router();

app.get("/:hubid/:userid", getdetails);
app.post("/:hubid/:userid", update);
export default app;