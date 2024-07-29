
import mongoose from "mongoose";

import dotenv from "dotenv";

const connectDB = (uri) => {
    mongoose
      .connect(uri, { dbName: process.env.MONGO_DATABASE_NAME })
      .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
      .catch((err) => {
        throw err;
      });
  };

  export default connectDB;