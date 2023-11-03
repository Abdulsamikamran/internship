import groc from "../assets/grocc-rem.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  addToCart,
  clearCart,
  decreaseCartItems,
  getTotal,
  removeFromCart,
} from "../features/cartSlice";
import { useEffect } from "react";

const Cart = () => {
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

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

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/checkout");
  };
  return (
    <div>
      <div className="w-full flex   md:h-80 bg-gradient-to-r from-slate-50 to-orange-100 ">
        <div className="w-full container mx-auto flex justify-between">
          <div className="md:my-24  my-20 ml-4 ">
            <h1 className="  font-extrabold mb-1 text-4xl md:text-5xl text-pink-700">
              Lorem ipsum dolor
            </h1>
            <p>Home/ View all</p>
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

      <div>
        {cartItems?.length === 0 ? (
          <div className="h-[400px] bg-white">
            <p className="font-extrabold text-[45px] text-pink-700 text-center ">
              Your Cart Is Empty!
            </p>
          </div>
        ) : (
          <div className="  bg-white justify-center  gap-x-44 gap-y-8 min-h-[400px] flex flex-wrap">
            <section className=" my-14 lg:w-fit w-full ">
              <div className="text-black   bg-white ">
                <div className="relative overflow-x-auto border-b-2 ">
                  <table className="text-sm text-left text-gray-50 border border-gray-400">
                    <thead className="text-xs text-gray-700 uppercase ">
                      <tr className="border-b border-gray-200">
                        <th scope="col" className="px-6 py-3">
                          Product
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
                              className="px-12 py-8 font-medium text-gray-900 whitespace-nowrap  "
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
                            <td className="px-12 py-8">${cartItem.price}</td>
                            <td className="px-12 py-8 ">
                              <div className="flex gap-6 border-b-2">
                                <button
                                  onClick={() => handleDecrease(cartItem)}
                                >
                                  -
                                </button>
                                {cartItem.cartQuantity}
                                <button
                                  onClick={() => handleAddToCart(cartItem)}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="px-12 py-8">
                              {" "}
                              ${cartItem.price * cartItem.cartQuantity}
                            </td>
                            <td>
                              <button
                                onClick={() => handleRemoveItems(cartItem)}
                                className=" text-gray-400  border-[1px] border-gray-300 px-1"
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section className=" mb-11 xl:my-14">
              <div>
                <div className="w-[300px] p-6   border border-gray-200  shadow ">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                      Cart Total
                    </h5>
                  </a>
                  <div className="flex justify-between">
                    <div>
                      <p className="uppercase mb-3 font-semibold text-gray-700 ">
                        Total Items
                      </p>
                      <p className="mb-3 uppercase font-semibold  text-gray-700 ">
                        Total
                      </p>
                    </div>
                    <div>
                      <p className="mb-3 font-normal text-gray-700 ">
                        {cartItems.length}
                      </p>
                      <p className="mb-3 font-normal text-gray-700 ">
                        ${cartTotalAmount}
                      </p>
                    </div>
                  </div>

                  <a
                    onClick={handleNavigate}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium justify-center  text-white bg-black  hover:bg-slate-800 focus:ring-4 focus:outline-none w-[250px] "
                  >
                    Checkout
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
