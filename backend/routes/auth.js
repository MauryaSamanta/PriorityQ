import express from "express";
import { login,register } from "../controllers/auth.js";


const app = express.Router();
app.post("/new",register);
app.post("/login",login);

export default app;