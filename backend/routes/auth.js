import express from "express";
import { checkusername, login,register } from "../controllers/auth.js";


const app = express.Router();
app.post("/new",register);
app.post("/login",login);
app.post("/check",checkusername);
export default app;