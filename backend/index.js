import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/rideRoutes.js";
dotenv.config();

const app = express();

const { PORT, MONGODB_URL } = process.env;

app.use(express.json());

app.use(cors());

app.use("/rides", router);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e.message);
  });
