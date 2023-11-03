import groc from "../assets/grocc-rem.png";
import check from "../assets/check2.png";
import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useFormik } from "formik";
import { MdOutlineImportantDevices } from "react-icons/md";
import { input } from "@material-tailwind/react";

const initialValues = {
  name: "",
  email: "",
  id: "",
  phone: "",
  address: "",
  area: "",
  deliveryNote: "",
  // confirm_password: "",
};

const SignUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  address: Yup.string().min(6).required("Please enter your address"),
  area: Yup.string().min(6).required("Please enter your area"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Invalid phone number"
    ),
});

const Checkout = () => {
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState();
  const [isCheckedCOD, setIsCheckedCOD] = useState(false);
  const [isCheckedND, setIsCheckedND] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const { tokenInfo } = useSelector((state) => state.user);

  const showForms = () => {
    setShowForm(!showForm);
  };
  const handleRadioChange = (event) => {
    setIsCheckedCOD(event.target.checked);
  };
  const handleRadioChange2 = (event) => {
    setIsCheckedND(event.target.checked);
  };
  // const cartData = cartItems.map((items) => ({
  //   productId: items.id,
  //   quantity: items.cartQuantity,
  // }));

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: SignUpSchema,

      onSubmit: async (values, actions) => {
        setEmail(values?.email);
        const orderData = {
          // email: userInfo.email,
          //  / id: userInfo.id,
          address: values.address,
          city: values.area,
          phone: values.phone,
          items: cartItems.map((items) => ({
            productId: items.id,
            quantity: items.cartQuantity,
          })),
        };
        const headers = {
          "Content-Type": "application/json",

          Authorization: `Bearer ${tokenInfo}`,
        };

        try {
          const response = await axios.post(
            "http://localhost:3002/api/order/add",
            orderData,

            {
              headers,
            }
          );
          console.log("data", response.data.result.orderId);
          localStorage.setItem("orderId", response.data.result.orderId);
          console.log("access token", response.accessToken);
          console.log("response", JSON.stringify(response));
          dispatch(clearCart());
          navigate("/orderplaced");
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

  return (
    <div>
      <section>
        <div className="w-full flex justify-between  h-80 bg-gradient-to-r from-slate-50 to-orange-100 ">
          <div className="my-24 ml-10">
            <h1 className="  font-extrabold mb-1 text-5xl text-pink-700">
              Lorem ipsum dolor
            </h1>
            <p>Home/ View all</p>
          </div>
          <div>
            <img
              className="h-full object-contain w-full pr-7"
              src={groc}
              alt=""
            />
          </div>
        </div>
      </section>

      <div className="bg-white">
        <div className="flex  py-11 justify-between container flex-wrap mx-auto  ">
          <div className="lg:w-3/5 w-full">
            <div className="">
              <div className="flex   justify-between">
                <div className="flex ">
                  <p className="mr-9 font-semibold text-lg">1</p>
                  <p className="font-semibold text-lg">Account</p>
                </div>
                <div className=" ">
                  <img
                    className="w-14 absolute -ml-12 object-contain"
                    src={check}
                    alt=""
                  />
                </div>
              </div>
              <div className="border-b-[1px] ml-12  border-black">
                <div className="text-slate-400 my-5">{userInfo.email}</div>
              </div>
              <form onSubmit={handleSubmit} className=" w-full">
                {showForm ? (
                  <div
                    onClick={showForms}
                    className="flex border-0  border-b-[1px] border-black   justify-between"
                  >
                    <div className="flex my-5 ">
                      <p className="mr-9  font-semibold text-lg">2</p>
                      <p className="font-semibold  text-lg">
                        Confirm Shipping Details
                      </p>
                    </div>
                    <div className="">
                      <img
                        className="w-14 absolute -ml-12   object-contain "
                        src={check}
                        alt=""
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="flex pt-11 justify-between">
                      <div className="flex ">
                        <p className="mr-9 font-semibold text-lg">2</p>
                        <p className="font-semibold text-lg">
                          Confirm Shipping Details
                        </p>
                      </div>
                    </div>
                    <div className="my-4 flex flex-wrap sm:flex-nowrap">
                      <div className="mx-12 my-2 w-[500px]">
                        <label
                          className="block text-sm   text-slate-400   mb-2"
                          htmlFor="name"
                        >
                          Name
                        </label>
                        <input
                          className="border-0 border-b-[1px] h-5 w-full  bg-inherit   border-b-black   py-2  text-black   text-sm leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></input>
                        {errors.name && touched.name ? (
                          <div>
                            <p className="form-error text-xs text-pink-700">
                              {errors.name}
                            </p>
                          </div>
                        ) : null}
                      </div>
                      <div className="mx-12 my-2 w-[500px]">
                        <label
                          className="block text-sm  text-slate-400   mb-2"
                          htmlFor="phone"
                        >
                          Phone
                        </label>
                        <input
                          className="border-0 border-b-[1px] h-5 w-full   bg-inherit border-b-black  py-2  text-black   text-sm leading-tight focus:outline-none focus:shadow-outline"
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></input>
                        {errors.phone && touched.phone ? (
                          <p className="form-error text-xs text-pink-700">
                            {errors.phone}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="my-4 flex  flex-wrap sm:flex-nowrap">
                      <div className="mx-12 my-2 w-[500px]">
                        <label
                          className="block text-sm   text-slate-400   mb-2"
                          htmlFor="address"
                        >
                          Address
                        </label>
                        <input
                          className="border-0 border-b-[1px] h-5 w-full    bg-inherit   border-b-black   py-2  text-black   text-sm leading-tight focus:outline-none focus:shadow-outline"
                          id="address"
                          type="text"
                          placeholder="Enter your address"
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></input>
                        {errors.address && touched.address ? (
                          <p className="form-error text-xs text-pink-700 ">
                            {errors.address}
                          </p>
                        ) : null}
                      </div>
                      <div className="mx-12 my-2  w-[500px]">
                        <label
                          className="block text-sm  text-slate-400   mb-2"
                          htmlFor="area"
                        >
                          Area
                        </label>
                        <input
                          className="border-0 border-b-[1px] h-5 w-full  bg-inherit border-b-black  py-2  text-black   text-sm leading-tight focus:outline-none focus:shadow-outline"
                          id="area"
                          type="text"
                          placeholder="Enter your phone number"
                          name="area"
                          value={values.area}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></input>
                        {errors.area && touched.area ? (
                          <p className="form-error text-xs text-pink-700">
                            {errors.area}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="mx-12 mt-7 ">
                      <label
                        className="block text-sm  text-slate-400   mb-2"
                        htmlFor="deliveryNote"
                      >
                        Delivery Note (Optional)
                      </label>
                      <input
                        className="border-0 border-b-[1px] h-5 w-full  bg-inherit border-b-black  py-2  text-black   text-sm leading-tight focus:outline-none focus:shadow-outline"
                        id="deliveryNote"
                        type="text"
                        placeholder="Enter your phone number"
                        name="deliveryNote"
                        value={values.deliveryNote}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      ></input>
                    </div>

                    <div className="flex  justify-end">
                      <button
                        onClick={showForms}
                        className="w-[200px] my-9 py-2 bg-black text-white"
                        disabled={
                          !values.name &&
                          !values.area &&
                          !values.address &&
                          !values.phone
                        }
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {showForm && (
                  <section className=" lg:w-fit w-full ">
                    <div className="flex my-5 ">
                      <p className="mr-9  font-semibold text-lg">3</p>
                      <p className="font-semibold  text-lg">Order Summary</p>
                    </div>
                    <div className="text-black   bg-white ">
                      <div className="relative overflow-x-auto border-b-2  ">
                        <table className="text-sm    text-left mt-5 text-gray-50 border  border-gray-400">
                          <thead className="text-xs text-gray-700 uppercase ">
                            <tr className="border-b border-gray-200">
                              <th scope="col" className="px-6 py-3">
                                Product
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Description
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Price
                              </th>
                              <th scope="col" className="px-6 py-3  ">
                                Quantity
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Total
                              </th>
                              <th scope="col" className="px-6 py-3"></th>
                            </tr>
                          </thead>
                          <tbody className="text-black">
                            {cartItems?.map((cartItem) => {
                              return (
                                <tr
                                  className="border-b  border-gray-200 "
                                  key={cartItem.id}
                                >
                                  <th
                                    scope="row"
                                    className="  py-8 font-medium text-gray-900 whitespace-nowrap  "
                                  >
                                    <div className="flex items-center">
                                      <div className="w-20 mr-6">
                                        <img
                                          className="bg-slate-100 w-20 "
                                          src={groc}
                                          alt=""
                                        />
                                      </div>
                                      <div>
                                        <p> {cartItem.title}</p>
                                      </div>
                                    </div>
                                  </th>
                                  <td className=" px-7 py-8">
                                    {cartItem.description}
                                  </td>
                                  <td className="py-8 px-7">
                                    ${cartItem.price}
                                  </td>
                                  <td className=" py-8 pl-12">
                                    {cartItem.cartQuantity}
                                  </td>
                                  <td className="px-7 py-8">
                                    {" "}
                                    ${cartItem.price * cartItem.cartQuantity}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <div className="float-right my-6">
                        <div className="flex my-4 font-semibold text-gray-400 gap-48 ">
                          <p>Delivery Fee:</p>
                          <p>$230</p>
                        </div>
                        <div className="flex border-0 my-6 border-b-[1px]  font-semibold justify-between">
                          <p className="mb-5">Total:</p>
                          <p>${cartTotalAmount + 230}</p>
                        </div>
                        <button
                          type="submit"
                          className="w-[200px] float-right my-9 py-2 bg-black text-white"
                          disabled={!isCheckedCOD && !isCheckedND}
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </section>
                )}
              </form>
            </div>
          </div>

          <div
            style={{ height: showForm ? "470px" : "350px" }}
            className=" max-w-[350px]   sm:mx-auto lg:mx-0 p-6 px-7 mb-36  bg-slate-50"
          >
            <h5 className="my-3 text-2xl font-bold tracking-tight text-gray-900 ">
              Cart Total
            </h5>

            <div className="flex border-0 border-b-2 justify-between">
              <div className="">
                <p className="uppercase my-3  font-semibold text-gray-700 ">
                  Total Items
                </p>
                <p className="mb-4 uppercase font-semibold  text-gray-700 ">
                  Total
                </p>
              </div>
              <div>
                <p className="my-3 font-bold  text-gray-700 ">
                  {cartItems.length}
                </p>
                <p className="mb-3 font-bold text-gray-700 ">
                  ${cartTotalAmount}
                </p>
              </div>
            </div>
            <div>
              <h5 className="my-3 text-2xl font-bold tracking-tight text-gray-900 ">
                Shipping mode
              </h5>
              <div className="flex justify-between">
                <p className=" my-3 font-semibold">Normal Delivery ($200)</p>
                <input
                  id="default-radio-1"
                  type="radio"
                  value=""
                  name="default-radio"
                  class="w-4 h-4 my-4"
                  checked={isCheckedND}
                  onChange={handleRadioChange2}
                />
                 
              </div>
              <p className="text-slate-300 mb-4 text-sm">
                Same day delivery if ordered before 12 PM
              </p>
            </div>
            {showForm && (
              <h5 className="text-2xl border-t-2 pb-4 font-bold tracking-tight text-gray-900 ">
                Payment Method
              </h5>
            )}
            {showForm && (
              <div>
                <div className="flex  justify-between">
                  <p className=" my-3 text-slate-400">Cash on delivery</p>
                  <input
                    id="default-radio"
                    type="radio"
                    value=""
                    name="default-radio3"
                    class="w-4 h-4 my-4"
                    checked={isCheckedCOD}
                    onChange={handleRadioChange}
                  />
                </div>
                <div className="flex  justify-between">
                  <p className=" my-3 text-slate-400">Payment by Card</p>
                  <input
                    id="default-radio"
                    type="radio"
                    value=""
                    name="default-radio3 "
                    class="w-4 h-4 my-4"
                    disabled
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
