import { BiSolidUser } from "react-icons/bi";
import { IoMdCart } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  button,
} from "@material-tailwind/react";
import { BiLogOut } from "react-icons/bi";
import { Drawer, Button } from "@material-tailwind/react";

import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import groc from "../assets/grocc-rem.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  addToCart,
  clearCart,
  decreaseCartItems,
  getTotal,
  removeFromCart,
} from "../features/cartSlice";
// import React from 'react';
// import { useDispatch } from 'react-redux';
import { logout } from "../features/userSlice";
import { useEffect } from "react";

const NavBar = () => {
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tokenInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getTotal());
  }, [cartItems, cartTotalAmount, , cartTotalQuantity]);

  const handleRemoveItems = (item) => {
    dispatch(removeFromCart(item));
  };
  const handleDecrease = (cartItem) => {
    dispatch(decreaseCartItems(cartItem));
  };
  const handleAddToCart = (cartItem) => {
    dispatch(addToCart(cartItem.id));
  };
  const handleclear = (clear) => {
    dispatch(clearCart(clear));
  };

  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleLogout = () => {
    // Dispatch the logout action to clear user and token data
    dispatch(logout());
    navigate("/signin");
  };
  return (
    <div>
      <Drawer
        className="fixed  z-50  right-0 shadow-lg"
        open={open}
        placement={"right"}
        onClose={closeDrawer}
        overlay={false}
      >
        <div className="   flex flex-col h-full bg-white items-center ">
          <div className="flex  pt-7 border-b-[1px] border-black  gap-44 ">
            <div className="flex mb-3   gap-1 text-pink-700">
              <IoMdCart size={"25px"} />
              {cartItems.length}
              <p>Items</p>
            </div>
            <div>
              <button onClick={closeDrawer}>
                <MdOutlineClose size={"20px"} />
              </button>
            </div>
          </div>
          {cartItems.length == 0 ? (
            <div className="h-44">
              <p className="mt-20 text-slate-500">your cart is empty</p>
            </div>
          ) : (
            <section className=" draww my-6 h-[350px]  overflow-y-scroll   w-[300px] ">
              <div>
                {cartItems?.map((cartItem) => {
                  return (
                    <div class="flex   ">
                      <div className=" ml-5 mb-4 ">
                        <img
                          className="bg-slate-100 w-20 h-20 mr-2"
                          src={groc}
                          alt=""
                        />
                      </div>

                      <div className="">
                        <div className="flex justify-between">
                          <p className="font-semibold mb-1 text-sm">
                            {" "}
                            {cartItem.title}
                          </p>
                          <button
                            onClick={() => handleRemoveItems(cartItem)}
                            className="-mr-10"
                          >
                            x
                          </button>
                        </div>

                        <p className="text-sm mb-1">${cartItem.price}</p>
                        <div className="flex  gap-3 ">
                          <button
                            className="bg-pink-700 w-6 rounded-sm"
                            onClick={() => handleDecrease(cartItem)}
                          >
                            <p className="text-lg text-white font-bold">-</p>
                          </button>
                          <p className="text-xs text-pink-700 mt-1 font-semibold">
                            {cartItem.cartQuantity}
                          </p>
                          <button
                            className="bg-pink-700 w-6 rounded-sm"
                            onClick={() => handleAddToCart(cartItem)}
                          >
                            <p className="text-lg text-white font-bold">+</p>
                          </button>
                          <button
                            onClick={() => handleRemoveItems(cartItem)}
                            className="bg-pink-700 ml-3 w-6 px-1 rounded-sm"
                          >
                            <AiFillDelete color="white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
          <section>
            <div className="flex gap-36 border-b -mt-2 mb-2">
              <p className="font-bold mb-2">Subtotal:</p>
              <p className="font-semibold">{cartTotalAmount}</p>
            </div>
            {cartItems.length == 0 ? (
              <div>
                <div>
                  <button
                    disabled
                    className="w-[250px] mb-4 py-2 bg-gray-400 text-white "
                  >
                    View Cart
                  </button>
                </div>
                <div>
                  <button
                    disabled
                    className="w-[250px] py-2 bg-gray-400 text-white "
                  >
                    Checkout
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <Link to={"/cart"}>
                    <button className="w-[250px] mb-4 py-2 bg-black text-white ">
                      View Cart
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to={"/checkout"}>
                    <button className="w-[250px] py-2 bg-black text-white ">
                      Checkout
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </section>
        </div>
      </Drawer>

      <header class="bg-white border-b">
        <div className=" container  mx-auto">
          <nav class=" w-full flex gap-x-4 max-w-full items-center  justify-between  py-4 ">
            <div class="flex-initial  ">
              <Link to={"/home"}>
                <span class="sv r-only text-pink-700 font-bold text-3xl  ">
                  Jiffy's
                </span>
              </Link>
            </div>

            <div class="flex flex-initial w-[600px] mx-3">
              <input
                type="text"
                id="search"
                class="bg-white text-lg w-full  flex-auto"
                placeholder="Search"
                required
              ></input>
              <div class="bg-pink-700 text-white">
                <FiSearch class="m-3 " />
              </div>
            </div>
            <div class="flex gap-3 flex-row ">
              <button onClick={openDrawer}>
                <IoMdCart size={"25px"} color="grey" />
              </button>

              {tokenInfo ? (
                <div class="dropdown">
                  <BiSolidUser
                    className="cursor-pointer"
                    size={"25px"}
                    color="grey"
                  />

                  <div class="dropdown-content">
                    <div onClick={handleLogout} className="py-2 flex gap-1">
                      <BiLogOut className="mt-[2px]" />
                      Logout
                    </div>
                    <div
                      onClick={() => navigate("/account")}
                      className="py-2 flex gap-1"
                    >
                      <BiLogOut className="mt-[2px]" />
                      User Details
                    </div>
                  </div>
                </div>
              ) : (
                <button onClick={() => navigate("/signin")}>
                  <BiSolidUser
                    className="cursor-pointer"
                    size={"25px"}
                    color="grey"
                    // onClick={navigate("/signin")}
                  />
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
