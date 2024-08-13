import express, { urlencoded } from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(urlencoded({ extended: true, limit: "16kb" }));
// routes import
import userRouter from "./router/user.router";

app.use("/api/v1/user", userRouter);

export { app };
