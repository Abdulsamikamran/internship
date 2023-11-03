import React from "react";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import Otp from "./Otp";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  // confirm_password: "",
};
const SignUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Invalid phone number"
    ),
  password: Yup.string().min(6).required("Please enter your password"),
  //   confirm_password: Yup.string()
  //     .required()
  //     .oneOf([Yup.ref("password"), null], "Password must match"),
});

const Registration = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: SignUpSchema,

      onSubmit: async (values, actions) => {
        setEmail(values?.email);
        try {
          const response = await axios.post(
            "http://localhost:3002/api/client/signup",
            {
              name: values.name,
              email: values.email,
              phone: values.phone,
              password: values.password,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          console.log("data", response.data);
          console.log("access token", response.accessToken);
          console.log("response", JSON.stringify(response));
          setSuccess(true);

        } catch (err) {
          if (!err?.response) {
            setError("No server response");
          } else if (err.response?.status === 400) {
            setError("username taken");
          } else {
            setError("registration failed");
          }
        }
      },
    });
  console.log(error);

  return (
    <div>
      {!success ? (
        <div className="bg-white container mx-auto my-16">
          <div>
            <p className=" my-5 pt-10 text-center text-2xl font-semibold ">
              New Customer
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
            <div className="mb-4">
              <label
                className="block text-black text-sm font-semibold  mb-2"
                htmlFor="name"
              >
                NAME
              </label>
              <input
                className="border-0 border-b-2 border-b-black  w-full py-2 px-3 text-black   text-sm leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter your name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {errors.name && touched.name ? (
                <p className="form-error">{errors.name}</p>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-semibold  mb-2"
                htmlFor="email"
              >
                EMAIL
              </label>
              <input
                className="border-0 border-b-2 border-b-black  w-full py-2 px-3 text-black   text-sm leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter you email address"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>

              {errors.email && touched.email ? (
                <p className="form-error">{errors.email}</p>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-semibold  mb-2"
                htmlFor="phone"
              >
                PHONE
              </label>
              <input
                className="border-0 border-b-2 border-b-black  w-full py-2 px-3 text-black   text-sm leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {errors.phone && touched.phone ? (
                <p className="form-error">{errors.phone}</p>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-black text-sm  font-semibold  mb-2"
                htmlFor="password"
              >
                PASSWORD
              </label>
              <input
                className="border-0 border-b-2 border-b-black  w-full py-2 px-3 text-black  text-sm leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {errors.password && touched.password ? (
                <p className="form-error">{errors.password}</p>
              ) : null}
            </div>
            <div className="mb-4">
              {/* <label
            className="block text-black text-sm font-semibold  mb-2"
            htmlFor="confirm_password"
          >
            CONFIRM PASSWORD
          </label>
          <input
            className="border-0 border-b-2 border-b-black  w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Confirm your password"
            // name="confirm_password"
            id="confirm_password"
            //value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input> */}
              {errors.confirm_password && touched.confirm_password ? (
                <p className="form-error">{errors.confirm_password}</p>
              ) : null}
            </div>

            <div className="flex items-center justify-end">
              <button
                className="w-[200px] mb-9 py-2 bg-black text-white"
                type="submit"
              >
                REGISTER NOW
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Otp email={email} />
      )}
    </div>
  );
};

export default Registration;
