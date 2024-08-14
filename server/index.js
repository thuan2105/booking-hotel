import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import route from "./routes/index.js";
import connectDB from "./config/db/index.js";
import { errorDefault } from "./utils/error.js";

const app = express();

// middlewares
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// ROUTES INIT
route(app);

// ERROR
app.use(errorDefault);

// CONNECT MONGODB
connectDB();

app.listen(3001, () => console.log("Connected to backend."));
