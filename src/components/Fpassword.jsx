import React from "react";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import { useState } from "react";

import { Link } from "react-router-dom";
import { useFormik } from "formik";
import Otp from "./Otp";
import PasswordOtp from "./PasswordOtp";

const Fpassword = () => {
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
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

  const onSubmit = async (values, actions) => {
    try {
      setOtpSent(false);

      const response = await axios.post(
        "http://localhost:3002/api/client/forget-password",
        {
          email: email,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("data", response.data);
      console.log("access token", response.accessToken);
      console.log("response", JSON.stringify(response));
      setOtpSent(true);
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
      {!otpSent ? (
        <>
          <div className="bg-white py-36 container mx-auto my-16">
            <div className="">
              <p className=" mb-3  text-center text-3xl font-semibold ">
                Password Reset
              </p>
              <p className="text-center text-xs text-slate-400 ">
                Enter email to send reset code
              </p>
            </div>
            {/* <form onSubmit={handleSubmit} className="mx-auto max-w-lg mt-7"> */}
            <div class="mb-4 mx-auto max-w-lg mt-7">
              <label
                class="block text-black text-sm font-semibold  mb-2"
                for="username"
              >
                EMAIL ADDRESS
              </label>
              <input
                class="border-0 border-b-2 border-b-black  w-full py-2 px-3 text-black   text-sm leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                //onBlur={handleBlur}
                //value={values.email}
                placeholder="Enter you email address"
              ></input>

              <div class="flex items-center justify-end -mt-3">
                <button
                  className="w-[200px] mb-9 mt-9 py-2 bg-pink-700 text-white"
                  type="submit"
                  onClick={onSubmit}
                >
                  SEND
                </button>
              </div>
            </div>
            {/* </form> */}
          </div>
        </>
      ) : (
        <PasswordOtp email={email} />
      )}
    </div>
  );
};

export default Fpassword;
