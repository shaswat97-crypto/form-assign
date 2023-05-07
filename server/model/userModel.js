import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    sex: { type: String, required: true },
    mobile: {
      type: String,
      match: /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
    },
    idType: {type: String },
    govtId: {type: String},
    guardianType: { type: String },
    guardianName: { type: String },
    email: { type: String, match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ },
    emergencyContact: {
      type: String,
      match: /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
    },
    address: { type: String },
    state: { type: String },
    city: { type: String },
    country: { type: String },
    pincode: { type: Number },
    occupation: { type: String },
    religion: { type: String },
    martitalStatus: { type: String },
    bloodGroup: { type: String },
    nationality: { type: String },
  });
  
  
  export const UserModel = mongoose.model("UserModel", userSchema);