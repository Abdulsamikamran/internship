import React from "react";
import check from "../assets/check2.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderPlaced = () => {
  const { userInfo } = useSelector((state) => state.user);
  const orderId = localStorage.getItem("orderId");

  return (
    <div className="bg-white">
      <div className="py-36">
        <img className="w-40 mb-4 mx-auto object-contain" src={check} alt="" />
        <p className=" text-center mb-2 font-bold text-gray-600 text-4xl">
          Order Placed Successfully
        </p>
        <p className="text-center mb-2 text-gray-600 ">
          Order details will be sent to your email address
        </p>
        <p className="text-center mb-2 text-gray-600 ">{userInfo.email}</p>
        <p className="text-center text-gray-600 "> OrderNumber #{orderId}</p>
        <div className="text-center mt-4">
          <Link to={"/home"}>
            <button className="bg-pink-700 text-white  px-10 py-5 rounded-md text-lg">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
