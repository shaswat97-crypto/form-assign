import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { statesOfIndia } from "./data";
import { citiesOfUP } from "./data";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup.string().required("Age is required"),
  sex: yup.string().required("Sex is required"),
  idType: yup.string(),
  govtId: yup.string().when("idType", (idType, schema) => {
    if (idType === "Aadhar") {
      return schema.matches(/^\d{12}$/, "Invalid Aadhar number");
    }
    if (idType === "PAN") {
      return schema.matches(/^[A-Z]{5}\d{4}[A-Z]{1}$/, "Invalid PAN number");
    }
    return schema;
  }),
});

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navTo = useNavigate();

  const [countryState, setCountryState] = useState("India");

  const handleClear = () => {
    setCountryState("");
  };

  const onSubmit = async (data) => {
    // axios.post()
    console.log({ data }, { errors });
    let res = await axios.post("/api/user", data);
    let d = await res.data;
    console.log(d);
    reset();
    navTo("/table");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="formcont">
        <div className="pdetails">
          <h1>Personal Details</h1>
          <div className="dcont">
            <div className="name-mob">
              <div className="label">
                <div className="lc">
                  <label>
                    Name<span>*</span>
                  </label>
                  <input
                    placeholder="Enter Name"
                    style={{ width: "400px" }}
                    type="text"
                    {...register("name")}
                  />
                </div>
                {errors.name && <p>{errors.name.message}</p>}
              </div>

              <div className="label">
                <div style={{ marginTop: "30px" }} className="lc">
                  <label>Mobile</label>
                  <input
                    placeholder="Enter Mobile"
                    style={{ width: "300px" }}
                    type="number"
                    {...register("mobile")}
                    min={9000000000}
                    max={9999999999}
                  />
                </div>
                {errors.mobile && <p>{errors.mobile.message}</p>}
              </div>
            </div>

            <div className="rest">
              <div className="label">
                <div style={{ marginBottom: "0px" }} className="lc">
                  <label style={{ width: "110px", marginRight: "30px" }}>
                    Date of Birth or Age<span>*</span>
                  </label>
                  <input
                    placeholder="DD/MM/YYYY or Age in Years"
                    style={{ width: "250px", marginRight: "20px" }}
                    type="number"
                    {...register("age")}
                  />
                </div>
                {errors.age && <p>{errors.age.message}</p>}
              </div>

              <div className="label">
                <div className="lc">
                  <label style={{ width: "50px" }}>
                    Sex<span>*</span>
                  </label>
                  <select style={{ width: "140px" }} {...register("sex")}>
                    <option value="">Enter sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                {errors.sex && <p>{errors.sex.message}</p>}
              </div>

              <div className="label">
                <div className="lc">
                  <label style={{ width: "140px" }}>Govt Issued ID</label>
                  <select
                    style={{ width: "170px", marginRight: "10px" }}
                    {...register("idType")}
                  >
                    <option value="">ID Type</option>
                    <option value="Aadhar">Aadhar</option>
                    <option value="PAN">PAN</option>
                  </select>
                  <input
                    placeholder="Enter Govt ID"
                    style={{ width: "300px" }}
                    type="text"
                    {...register("govtId")}
                  />
                </div>
                {errors.govtId && <p>{errors.govtId.message}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="cdetails">
          <h1>Contact Details</h1>
          <div className="guardcont">
            <div className="name-mob">
              <div className="label">
                <div className="lc">
                  <label style={{ width: "130px" }}>Guardian Details</label>
                  <select
                    style={{ width: "130px", marginRight: "10px" }}
                    {...register("guardianType")}
                  >
                    <option value="">Enter label</option>
                    <option value="Aadhar">Temporary</option>
                    <option value="PAN">Emergency</option>
                  </select>
                  <input
                    placeholder="Enter Guardian Name"
                    style={{ width: "190px" }}
                    type="text"
                    {...register("guardianName")}
                  />
                </div>
              </div>
            </div>

            <div className="label">
              <div className="lc">
                <label>Email:</label>
                <input
                  placeholder="Enter Email"
                  style={{ width: "210px" }}
                  type="text"
                  {...register("email")}
                />
              </div>
            </div>

            <div className="label">
              <div className="lc">
                <label style={{ width: "150px", marginLeft: "30px" }}>
                  Emergency Contact Number:
                </label>
                <input
                  placeholder="Enter Emergency No"
                  type="text"
                  {...register("emergencyContact")}
                />
              </div>
              {errors.emergencyContact && (
                <p>{errors.emergencyContact.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="adetails">
          <h1>Address Details</h1>
          <div className="ac">
            <div className="name-mob">
              <div className="label">
                <div className="lc">
                  <label>Address:</label>
                  <input
                    placeholder="Enter Address"
                    style={{ width: "390px" }}
                    type="text"
                    {...register("address")}
                  />
                </div>
              </div>

              <div className="label">
                <div className="lc">
                  <label>Country</label>
                  <input
                    value={"India"}
                    style={{ width: "270px" }}
                    type="text"
                    {...register("country")}
                  />
                </div>
              </div>
            </div>
            <div className="dcont">
              <div className="pincode">
                <div className="label">
                  <div className="lc">
                    <label>State</label>
                    <select style={{ width: "250px" }} {...register("state")}>
                      <option value="">Enter state</option>
                      {statesOfIndia.map((state) => (
                        <option value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="label">
                  <div className="lc">
                    <label>Pincode</label>
                    <input
                      placeholder="Enter pincode"
                      style={{ width: "200px" }}
                      type="text"
                      {...register("pincode")}
                    />
                  </div>
                </div>
              </div>

              <div className="city">
                <div className="label">
                  <div className="lc">
                    <label>City</label>
                    <select style={{ width: "220px" }} {...register("city")}>
                      <option value="">Enter city/town/village</option>
                      {citiesOfUP.map((city) => (
                        <option value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="odetails">
          <h1>Other Details</h1>
          <div className="dcont">
            <div className="ocu">
              <div className="label">
                <div className="lc">
                  <label style={{ width: "100px" }}>Occupation</label>
                  <input
                    placeholder="Enter occupation"
                    style={{ width: "220px" }}
                    type="text"
                    {...register("occupation")}
                  />
                </div>
              </div>

              <div className="label">
                <div className="lc">
                  <label style={{ width: "100px" }}>Nationality</label>
                  <input
                    value={countryState}
                    style={{
                      outline: "none",
                      width: "200px",
                      borderRight: "none",
                      borderRadius: "0px",
                    }}
                    type="text"
                    {...register("nationality")}
                  />
                  <div onClick={handleClear} className="x">
                    X
                  </div>
                </div>
              </div>
            </div>

            <div className="rest">
              <div className="label">
                <div className="lc">
                  <label>Religion</label>
                  <select style={{ width: "180px" }} {...register("religion")}>
                    <option value="">Enter Religion</option>
                    <option value="Aadhar">Aadhar</option>
                    <option value="PAN">PAN</option>
                  </select>
                </div>
              </div>

              <div className="label">
                <div className="lc">
                  <label style={{ width: "130px" }}>Maritial Status</label>
                  <select
                    style={{ width: "220px" }}
                    {...register("martitalStatus")}
                  >
                    <option value="">Enter Maritial Status</option>
                    <option value="Aadhar">Aadhar</option>
                    <option value="PAN">PAN</option>
                  </select>
                </div>
              </div>

              <div className="label">
                <div className="lc">
                  <label style={{ width: "110px" }}>Blood Group</label>
                  <select style={{ width: "80px" }} {...register("bloodGroup")}>
                    <option value="">Group</option>
                    <option value="Aadhar">Aadhar</option>
                    <option value="PAN">PAN</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="btncont">
        <button className="cancel" onClick={(e) => e.preventDefault}>
          Cancel
          <p>(ESC)</p>
        </button>
        <button className="submit" type="submit">
          Submit
          <p>(Ctrl S)</p>
        </button>
      </div>
    </form>
  );
}

export default Form;
