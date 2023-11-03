import React from "react";
import groc from "../assets/grocc-rem.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { AiOutlineMail } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
const Account = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <div>
      <section>
        <div className="w-full flex   md:h-80 bg-gradient-to-r from-slate-50 to-orange-100 ">
          <div className="w-full container mx-auto flex justify-between">
            <div className="md:my-24  my-20 ml-4 ">
              <h1 className="  font-extrabold mb-1 text-4xl md:text-5xl text-pink-700">
                Lorem ipsum dolor
              </h1>
              <div className="flex">
                <a className="no-underline text-pink-700" href="/home">
                  Home
                </a>
                <p>/ View all</p>
              </div>
            </div>
            <div>
              <img
                className="md:h-full md:mt-1 mt-20 object-contain w-full "
                src={groc}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-200 min-h-[600px]">
        <div className="container mx-auto bg-white min-h-[200px] mt-20">
          <div className="flex   border-0 border-b-2 justify-between mx-8">
            <h1 className="font-semibold text-xl my-5 ">Account details</h1>
            <button className="bg-pink-700 px-4 py-1 my-5 text-white">
              Logout
            </button>
          </div>
          <div className="container mx-auto ">
            <div className="flex my-4">
              <BiSolidUser className="mx-4" color="gray" />
              <div className="text-gray-500 -mt-[6px]">{userInfo.name}</div>
            </div>
            <div className="flex my-4">
              <AiOutlineMail className="mx-4" color="gray" />
              <div className="text-gray-500 -mt-[6px]"> {userInfo.email}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Account;
