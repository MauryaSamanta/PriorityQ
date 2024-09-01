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
     const check=await User.findOne({email:email});
     if(check)
      return res.status(200).json(`Present`);
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
      if (!user) return res.status(200).json( "no exist" );
  
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) return res.status(200).json( "Invalid" );
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };

  export const checkusername=async(req,res)=>{
    const {username}=req.body;
    try {
      const user=await User.findOne({username:username});
      if(user)
        res.status(200).json(`Taken`);
      else
        res.status(200).json(`Available`);
    } catch (error) {
       console.log(error);
       res.status(400).json(`Error`);
    }
  }