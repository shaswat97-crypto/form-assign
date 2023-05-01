import mongoose, { Schema } from "mongoose";

const personalDetailsSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    sex: { type: String, required: true },
    mobile: {
      type: String,
      match: /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
    },
    govtId: {
      type: { type: String },
      number: {
        type: String,
        validate: [
          {
            validator: function (v) {
              return this.govtId.type === "Aadhar"
                ? /^\d{12}$/.test(v)
                : /^[a-zA-Z0-9]{10}$/.test(v);
            },
            //   message: props => `${props.path} is invalid`
          },
        ],
      },
    },
  });
  
  const guardianSchema = new Schema({
    type: { type: String },
    name: { type: String },
  });
  
  const contactDetailsSchema = new Schema({
    guardian: guardianSchema,
    email: { type: String, match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ },
    emergencycontact: {
      type: String,
      match: /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
    },
  });
  
  const addressDetailsSchema = new Schema({
    address: { type: String },
    state: { type: String },
    city: { type: String },
    country: { type: String },
    pincode: { type: Number },
  });
  
  const otherDetailsSchema = new Schema({
    occupation: { type: String },
    religion: { type: String },
    martitalStatus: { type: String },
    bloodGroup: { type: String },
    nationality: { type: String },
  });
  
  const userSchema = new Schema({
    personalDetails: personalDetailsSchema,
    contactDetails: contactDetailsSchema,
    addressDetails: addressDetailsSchema,
    otherDetails: otherDetailsSchema,
  });
  
  export const UserModel = mongoose.model("UserModel", userSchema);