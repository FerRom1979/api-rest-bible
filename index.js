import express from "express";
import "dotenv/config";
import "./database/connected.js";
import authRouter from "./routes/auth.routes.js";
import questionsRouter from "./routes/questions.routes.js";
import usersRoutes from "./routes/users.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

/* app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback("Cors Error origin:" + origin + "an authorize");
    },
  })
); */

app.use(cors());

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/questions", questionsRouter);
app.use("/api/v1/users", usersRoutes);

app.use(cookieParser());
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server en por ${PORT} 😎`));
