import Slider from "react-slick";
import { Link } from "react-router-dom";
import { MdOutlineBakeryDining } from "react-icons/md";
import { useEffect, useState } from "react";
import Responsive from "./Slider";
var settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 1000,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
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

const Product = () => {
  const [categories, setCategories] = useState("");
  async function FetchData() {
    try {
      let response = await fetch(
        `http://localhost:3002/api/product/category/view`,
        {
          method: "POST",
        }
      );
      let data = await response.json();
      setCategories(data);
      console.log(data);
    } catch (error) {
      //   setError(error);
      console.log(error);
    }
  }
  useEffect(() => {
    FetchData();
  }, []);

  const colors = [
    "bg-pink-100",
    "bg-blue-100",
    "bg-orange-100",
    "bg-purple-100",
    "bg-amber-100",
    "bg-green-100",
    "bg-red-100",
    " bg-cyan-100",
  ];
  return (
    <div className="max-w-full">
      <div className="container mx-auto">
        <section class="bg-white  sm:my-10 ">
          <div class="w-full  h-[534px]">
            <div class="flex justify-between w-full border-b ">
              <h1 class="text-2xl font-semibold p-7 text-stone-950">
                Product Categories
              </h1>
            </div>
            <div class="hidden lg:block   lg:px-10 py-5 x  md:ml-0  xl:mx-64 xl:ml-72 xl:pb-10">
              <div class="  lg:grid lg:gap-x-5 lg:gap-y-5 lg:grid-cols-4 gap-x-0 gap-y-4 ">
                {categories?.result?.rows?.map((category, index) => {
                  return (
                    <Link
                      to={`/all?category_id=${category.id}`}
                      className={`h-[170px] rounded-[4px] w-[200px] ${colors[index]}`}
                    >
                      <div>
                        <h4 class="text-center mt-10 items-center text-black font-semibold   ">
                          {category?.title}
                        </h4>
                        <MdOutlineBakeryDining
                          size={"50px"}
                          class="mx-auto mt-2"
                          color="grey"
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div class="block lg:hidden md:my-24 md:mx-24 mx-20 my-20 products-parent">
              <Slider {...settings} class="products-div">
                {categories?.result?.rows?.map((category, index) => {
                  return (
                    <div class={` h-[150px] w-[150px] mb-20 ${colors[index]}`}>
                      <div>
                        <h4 class="text-center text-black font-semibold mt-3  ">
                          {category.title}
                        </h4>
                        <MdOutlineBakeryDining
                          size={"50px"}
                          class="mx-auto mt-7"
                          color="grey"
                        />
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </section>
        <section class="bg-white pb-7  ">
          <div class="w-full  h-[500px]   sm:my-12 ">
            <div class="flex justify-between w-full border-b ">
              <h1 class="text-2xl font-semibold p-7 text-stone-950">
                Featured Products
              </h1>
              <a class="text-sm p-7" href="/all">
                View All
              </a>
            </div>
            <div>
              <Responsive />
            </div>
          </div>
        </section>
        <section class="bg-white  pb-7  ">
          <div class="w-full  h-[500px]   sm:my-12 ">
            <div class="flex justify-between w-full border-b ">
              <h1 class="text-2xl font-semibold p-7 text-stone-950">
                Bakery & Dairy
              </h1>
              <a class="text-sm p-7" href="/all">
                View All
              </a>
            </div>
            <div>
              <Responsive />
            </div>
          </div>
        </section>
        <section class="bg-white pb-7 ''">
          <div class="w-full  h-[500px]   sm:my-12 ">
            <div class="flex justify-between w-full border-b ">
              <h1 class="text-2xl font-semibold p-7 text-stone-950">
                Beverages & Snacks
              </h1>
              <a class="text-sm p-7" href="/all">
                View All
              </a>
            </div>
            <div className="">
              <Responsive />
            </div>
          </div>
        </section>
        <section class="bg-white  pb-7  mb-5 ">
          <div class="w-full  h-[500px]   sm:my-12 ">
            <div class="flex justify-between w-full border-b ">
              <h1 class="text-2xl font-semibold p-7 text-stone-950">
                Baby Care & Toddlers
              </h1>
              <a class="text-sm p-7" href="">
                View All
              </a>
            </div>
            <div>
              <Responsive />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Product;
