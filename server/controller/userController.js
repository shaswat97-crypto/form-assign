import mongoose from "mongoose";
import { UserModel } from "../model/userModel.js";

export const createUser = async (req, res) => {
  // console.log(req.body);

  try {
    const newUser = await UserModel.create(req.body);
    console.log(newUser)
    res.status(201).send(newUser);
  } catch (error) {
    console.log({ error });
    res.status(500).send("Server error");
  }
};

export const getUser = async (req, res) => {
  try{
    let data = await UserModel.find();
    res.send(data);
  }
  catch{
    console.log({ error });
    res.status(500).send("Error fetching users");
  }
}
