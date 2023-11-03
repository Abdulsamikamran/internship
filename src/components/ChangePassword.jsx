import React from "react";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import { useState } from "react";

import PasswordOtp from "./PasswordOtp";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [error, setError] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const otp = localStorage.getItem("otp");
  // const initialValues = {
  //   email: "",

  //   // confirm_password: "",
  // };
  // const SignUpSchema = Yup.object({
  //   email: Yup.string().email().required("Please enter your email"),
  // });

  // const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  // useFormik({
  //   initialValues,
  //   validationSchema: SignUpSchema,
  const token = localStorage.getItem("token");
  console.log(token);
  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/client/change-forget-password",
        {
          otp: otp,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/signin");
      console.log("data", response.data);
      console.log("access token", response.accessToken);
      console.log("response", JSON.stringify(response));
    } catch (err) {
      if (!err?.response) {
        setError("No server response");
      } else if (err.response?.status === 400) {
        setError("username taken");
      } else {
        setError("registration failed");
      }
    }
  };
  // });

  return (
    <div>
      <>
        <div className="bg-white py-36 container mx-auto my-16">
          <div className="">
            <p className=" mb-3  text-center text-3xl font-semibold ">
              Password Reset
            </p>
            <p className="text-center text-xs text-slate-400 ">
              Enter email to send
            </p>
          </div>
          {/* <form onSubmit={handleSubmit} className="mx-auto max-w-lg mt-7"> */}
          <div class="my-5 mx-auto max-w-lg  mt-7">
            <label
              class="block text-black text-sm font-semibold  mb-2"
              for="username"
            >
              New Password
            </label>
            <input
              class="border-0 border-b-2 border-b-black  w-full py-2 px-3 text-black   text-sm leading-tight focus:outline-none focus:shadow-outline"
              id="change password"
              type="text"
              name="new Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              //onBlur={handleBlur}
              //value={values.email}
              placeholder="Enter your new password"
            ></input>

            <div class="flex items-center justify-end -mt-3">
              <button
                className="w-[200px] mb-9 mt-9 py-2 bg-pink-700 text-white"
                type="submit"
                onClick={onSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
          {/* </form> */}
        </div>
      </>
    </div>
  );
};

export default ChangePassword;
