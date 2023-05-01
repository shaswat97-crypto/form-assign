import mongoose from "mongoose";
import { UserModel } from "../model/userModel.js";

export const createUser = async (req, res) => {
  const { personalDetails, contactDetails, addressDetails, otherDetails } =
    req.body;

  try {
    const newUser = await UserModel.create({
      personalDetails,
      contactDetails,
      addressDetails,
      otherDetails,
    });
    res.status(201).send(newUser);
  } catch (error) {
    console.log({ error });
    res.status(500).send("Server error");
  }
};
