import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { createQube,addMemberstoQube,listUsersInQube,listZonesInQube, editQube, deleteQube } from "../controllers/qube.js";
const app=express.Router();

app.post("/:hubid/new",verifyToken, createQube);
app.post("/:qubeid", verifyToken, addMemberstoQube);
app.get("/:qubeid", listUsersInQube);
app.patch("/:qubeid",editQube);
app.get("/:qubeid/zone",verifyToken,listZonesInQube);
app.delete("/:qubeid",deleteQube);

export default app;