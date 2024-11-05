import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/UserRoute.js";
import mail_domainRoute from "./routes/Email_domain_route.js";
import cookieParser from "cookie-parser";
import Separation_route from "./routes/Separation_route.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to the MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000","https://mail-master.vercel.app"],
    credentials: true,
  })
);

app.use("/user", userRoute);
app.use("/info", mail_domainRoute);
app.use("/", Separation_route);

app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
