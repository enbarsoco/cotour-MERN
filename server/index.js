import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3001;
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
import dotenv from "dotenv";

dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/tours", tourRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => console.log(`${err} did not connect`));