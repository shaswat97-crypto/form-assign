import express from "express";
import mongoose, { Schema } from "mongoose";
import { router } from "./userRoute.js";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/onito")
  .then(() => console.log("db connected"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/user", router);

app.listen(8080, () => {
  console.log("server listening at port 8080");
});
