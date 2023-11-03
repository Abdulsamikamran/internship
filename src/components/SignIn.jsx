import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignIn } from "../features/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import Otp from "./Otp";

const initialValues = {
  email: "",

  password: "",
  // confirm_password: "",
};
const SignUpSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),

  password: Yup.string().min(6).required("Please enter your password"),
  //   confirm_password: Yup.string()
  //     .required()
  //     .oneOf([Yup.ref("password"), null], "Password must match"),
});

const SignIn = () => {
  const { tokenInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: SignUpSchema,

      onSubmit: async (values, actions) => {
        dispatch(
          userSignIn({
            body: values,
            navigate,
          })
        );
      },
    });

  //   const token = useSelector((state) => state.data.token); // Assuming your token is stored in a 'token' property

  return (
    <div>
      <div className="bg-white container mx-auto my-16">
        <div>
          <p className=" my-5 pt-10 text-center text-3xl font-semibold ">
            Account Login
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
          <div class="mb-4">
            <label
              class="block text-black text-sm font-semibold  mb-2"
              for="email"
            >
              EMAIL
            </label>
            <input
              class="border-0 border-b-2 border-b-black  w-full py-2 px-3 text-black   text-sm leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter you email address"
            ></input>

            {errors.email && touched.email ? (
              <p className="form-error">{errors.email}</p>
            ) : null}
          </div>

          <div class="mb-4">
            <label
              class="block text-black text-sm  font-semibold  mb-2"
              for="password"
            >
              PASSWORD
            </label>
            <input
              class="border-0 border-b-2 border-b-black  w-full py-2 px-3 text-black  text-sm leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter password"
            ></input>
            {errors.password && touched.password ? (
              <p className="form-error">{errors.password}</p>
            ) : null}
          </div>
          <div className="flex justify-end">
            <Link to={"/newpassword"}>
              <p className="text-slate-500 text-xs -mt-3">Forgot Password?</p>
            </Link>
          </div>
          <div class="flex items-center justify-srart">
            <button
              className="w-[200px] mb-9 mt-9 py-2 bg-pink-700 text-white"
              type="submit"
            >
              LOGIN
            </button>
          </div>
          <div className="pb-12">
            <Link to={"/signup"}>
              <p className="text-slate-500 text-xs -mt-7">
                Don't have an account? click here
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
