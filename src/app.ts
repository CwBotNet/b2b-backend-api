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
import companyRouter from "./router/company.router";
import categoryRouter from "./router/category.router";
// auth
app.use("/api/v1/auth", authRouter);
// user
app.use("/api/v1/user", userRouter);
// company
app.use("/api/v1/company", companyRouter);
// category
app.use("/api/v1/category", categoryRouter);

export { app };
