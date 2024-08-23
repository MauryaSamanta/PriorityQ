import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

/* REGISTER USER */
export const register = async (req, res) => {
    try {
      const {
        username,
        email,
        password,
        dob
      } = req.body;
     console.log(password);
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        username,
        email,
        password_hash:passwordHash,
        bio:'',
        avatar_url:'',
        dob:dob
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
        console.log(err);
      res.status(500).json({ error: err.message });
    }
  };
  
  /* LOGGING IN */
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };