import express from "express";
import mongoose, { Schema } from "mongoose";
import { router } from "./userRoute.js";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((err) => {
    console.log(err);
  });

app
  .use(express.json())
  .use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)))
  .use("/api/user", router);

app.listen(process.env.PORT, () => {
  console.log("server listening at port " + process.env.PORT);
});
