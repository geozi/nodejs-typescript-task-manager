/**
 * Main.
 */
import express from "express";
const app = express();
const port = 3000;
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import authRouter from "./presentation/routes/auth.route";
import userRouter from "./presentation/routes/user.route";
import taskRouter from "./presentation/routes/task.route";
dotenv.config();

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connection to database established");
  } catch (error) {
    console.log("Failed to connect to database", error);
  }
}

app.use(express.json());
app.use("/api/login", authRouter);
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

connectToDb();
