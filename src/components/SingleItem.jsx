import React from "react";
import { useParams } from "react-router-dom";
import groc from "../assets/grocer-rem.png";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, decreaseCartItems } from "../features/cartSlice";

const SingleItem = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const quantity = cartItems.map((items) => {
    items.cartQuantity;
  });
  const { productId } = useParams();

  const [product, setProduct] = useState();
  async function FetchData() {
    try {
      let response = await fetch(
        `http://localhost:3002/api/product/view/${productId}`,
        {
          method: "GET",
        }
      );

      let data = await response.json();
      setProduct(data.result);

      console.log(product.title);
    } catch (error) {
      //   setError(error);
      console.log(error);
    }
  }
  useEffect(() => {
    FetchData();
  }, [productId]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="mx-auto ">
      <div className="flex flex-wrap  bg-white my-11 mx-64 shadow-md   py-32">
        <div className="w-[400px]">
          <img className="" src={groc} alt="" />
        </div>
        <div className="">
          <h2 className="mb-5 text-5xl text-pink-700 font-bold">
            {" "}
            {product?.title}
          </h2>
          <h1 className="font-semibold text-xl mb-2">
            Price: ${product?.price}
          </h1>
          <h2>{product?.description}</h2>
          <div className="flex gap-7">
            <div className="mt-7">
              {cartItems.find((item) => item.id === product?.id) ? (
                <button
                  disabled
                  className="text-white px-3 py-2 text-sm my-2 -mt-2 float-right rounded-m bg-gray-300"
                >
                  Added to Cart
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleAddToCart(product);
                  }}
                  className="text-white px-3 py-2 text-sm my-2 -mt-2 float-right rounded-m bg-pink-700"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
