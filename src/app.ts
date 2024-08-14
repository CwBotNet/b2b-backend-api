import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

// middlewares
app.use(
  cors({
    origin: "localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
// routes import
import userRouter from "./router/user.router";
import authRouter from "./router/auth.router";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

export { app };
