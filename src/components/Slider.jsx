import React, { useEffect } from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import grocc from "../assets/grocer-rem.png";
import { Link } from "react-router-dom";
import { productsFetch } from "../features/productSlice";

const Responsive = () => {
  const { items, isLoading, error } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  useEffect(() => {
    dispatch(productsFetch(null));
  }, [dispatch]);

  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div>
      {isLoading ? (
        <p>loading</p>
      ) : error ? (
        <p>no products</p>
      ) : (
        <div class="my-11 mx-6 px-8 product">
          <Slider {...settings}>
            {items?.result?.rows?.map((product) => {
              return (
                <div
                  class=" max-w-sm w-full rounded overflow-hidden shadow-sm "
                  key={product.id}
                >
                  <div className="bg-slate-200">
                    {product.discount == 0 ? (
                      ""
                    ) : (
                      <span class="rounded-md w-10 absolute px-2 py-[3px] text-white bg-pink-700">
                        ${product.discount}
                      </span>
                    )}
                    <Link to={`/singleItem/${product.id}`}>
                      <img class="w-full py-9" src={grocc} alt=""></img>
                    </Link>
                  </div>
                  <div className="px-6 pt-2 pb-2">
                    <Link to={`/singleItem/${product.id}`}>
                      <h4 class="text-black font-semibold text-lg ">
                        {product.title}
                      </h4>
                    </Link>
                    {product.discount == 0 ? (
                      <span class="mr-4 ">${product.price}</span>
                    ) : (
                      <div>
                        <span class="mr-4 line-through ">${product.price}</span>
                        <span class="text-pink-700 font-semibold">
                          ${product.price - product.discount}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    {cartItems.find((item) => item.id === product.id) ? (
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
              );
            })}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default Responsive;
