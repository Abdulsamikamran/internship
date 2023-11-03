import Slider from "react-slider";
import { useState, useEffect } from "react";
import groc from "../assets/grocc-rem.png";
import React from "react";
import { TECollapse } from "tw-elements-react";
import { Drawer } from "@material-tailwind/react";
import grocc from "../assets/grocer-rem.png";
import { AiOutlineBars } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { productsFetch } from "../features/productSlice";
import { debounce } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";
import useDebounce from "../hooks/useDebounce";

const AllItems = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState("");
  const navigate = useNavigate();
  const [categorySelect, setCategorySelect] = useState(false);
  const dispatch = useDispatch();
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { items, isPending, error } = useSelector((state) => state.product);
  const [searchParams, setSearchParams] = useSearchParams();

  //setting params-------------

  const queryParams = queryString.parse(location.search);
  console.log("parammmmmssss-----", queryParams);

  let rItems = items?.result?.rows;
  const MIN = 0;
  const MAX = 10000;
  const [priceValue, setPriceValue] = useState([MIN, MAX]);
  console.log("price value:", priceValue);
  const [filters, setFilters] = useState({
    category_id: queryParams?.category_id && queryParams?.category_id,
    price: {
      upperLimit: MAX,
      lowerLimit: MIN,
    },
    title: "",
    // ...queryParams,
  });
  const param = searchParams.get("category_id");

  console.log("filters----------->", filters);

  const handleClearFilter = () => {
    // const param = searchParams.get("category_id");
    // if (param) {
    //   searchParams.delete("category_id");

    //   setSearchParams(searchParams);

    //   console.log("category filter---------:", searchParams);
    //   navigate({ search: queryString.stringify({ searchParams }) });
    //   navigate(`?${searchParams.toString()}`);
    // }
    // navigate("/all");
    dispatch(productsFetch(null));
  };

  // const [debouncedValue] = useDebounce(input, 2000);
  // const [debouncedValue2] = useDebounce(priceF, 2000);

  // ----------- Input Filter -----------

  const handleInputChange = (event) => {
    setFilters({
      ...filters,
      title: event.target.value,
    });
  };

  const debouncedOnChange = debounce(handleInputChange, 1000);

  /* Api Calls for products */
  useEffect(() => {
    dispatch(productsFetch({ ...filters }));

    console.log("filters in useeffect:", filters);
  }, [filters]);

  //--------------Setting price range to filters

  const debouncedValue = useDebounce(priceValue, 1000);
  const handlePriceRangeChange = (value) => {
    setPriceValue(value);
  };

  useEffect(() => {
    console.log("use effect called for price range");
    console.log("debounce value", debouncedValue);
    if (debouncedValue) {
      console.log("price range changing filters--");
      const price = {
        upperLimit: debouncedValue[1],
        lowerLimit: debouncedValue[0],
      };

      setFilters({ ...filters, ...price });

      // console.log("====>dummy price", price);
    }
  }, [debouncedValue]);
  // -----------------setting categories to filters
  const handleCategories = () => {
    setFilters({
      ...filters,
      category_id: category.id,
    });
    queryParams.category = category.id;
    navigate({ search: queryString.stringify({ category_id }) });
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  //------------getting categories
  async function FetchCate() {
    try {
      let response = await fetch(
        `http://localhost:3002/api/product/category/view`,
        {
          method: "POST",
        }
      );
      let data = await response.json();

      setCategories(data);
    } catch (error) {
      //   setError(error);
      console.log(error);
    }
  }
  useEffect(() => {
    FetchCate();
  }, []);

  const [activeElement, setActiveElement] = useState("");

  const handleClick = (value) => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  };

  return (
    <div>
      <div className="">
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
      </div>
      <div className="flex  h-full bg-white">
        <section className="bg-white  hidden md:block">
          <div>
            <div className="mx-4 ml-24 lg:w-[300px]   md:w-[200px]  w-fit">
              <div className="h-full py-7">
                <div className="w-full">
                  <div class="relative z-0 w-full mb-2  group">
                    <input
                      type="text"
                      class="block py-2.5 px-0 w-full text-md text-black  border-0 border-b-2 bg-transparent  dark:focus:border-pink-700 focus:outline-none focus:ring-0 focus:border-pink-700 peer"
                      placeholder=" "
                      onChange={debouncedOnChange}
                    />
                    <label
                      for="floating_email"
                      class="peer-focus:font-medium absolute text-md text-gray-200  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-pink-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Search products
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-black text-xl mb-12">Filter by price</h2>
              </div>
              <div>
                <Slider
                  className="sliders"
                  thumbClassName="thumb"
                  value={priceValue}
                  // defaultValue={null}
                  min={MIN}
                  max={MAX}
                  onChange={handlePriceRangeChange}
                  ariaLabel={["Lower thumb", "Upper thumb"]}
                  ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                  renderThumb={(props, state) => (
                    <div {...props}>
                      <span className="text-pink-700 absolute -top-5 -left-2 ">
                        {state.valueNow}
                      </span>
                    </div>
                  )}
                />
              </div>

              <div className="w-full mt-4">
                <div id="accordionExample">
                  <div className=" bg-white   ">
                    <h2
                      className="mb-0 text-black text-xl mt-7 "
                      id="headingOne"
                    >
                      <button
                        className={`${
                          activeElement === "element1" &&
                          `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:text-pink-700 text-black text-xl mt-7 `
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left  transition [overflow-anchor:none] hover:z-[2] focus:z-[3] text-black text-xl mt-7 focus:outline-none`}
                        type="button"
                        onClick={() => handleClick("element1")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Filter by category
                        <span
                          className={`${
                            activeElement === "element1"
                              ? `rotate-[-180deg] -mr-1`
                              : `rotate-0 fill-[#212529]  dark:fill-white`
                          } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      </button>
                    </h2>
                    <TECollapse
                      show={activeElement === "element1"}
                      className="!mt-0 !rounded-b-none !shadow-none"
                    >
                      <div className="px-5 py-4 flex flex-col">
                        {categories?.result?.rows?.map((category) => {
                          return (
                            <span
                              className={`my-1 cursor-pointer ${
                                category.id === filters.category_id
                                  ? "font-bold"
                                  : ""
                              }`}
                              key={category.id}
                              onClick={() => {
                                setCategorySelect(true);
                                setFilters({
                                  ...filters,
                                  category_id: category.id,
                                });
                              }}
                            >
                              {category.title}
                            </span>
                          );
                        })}
                      </div>
                    </TECollapse>
                    <button
                      onClick={() => handleClearFilter()}
                      className="text-white mb-24 bg-pink-700 px-4 py-3"
                    >
                      clear filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="min-h-[700px]">
          <section className="block md:hidden z-50 sticky top-5  ">
            <button className="m-4" onClick={openDrawer}>
              <AiOutlineBars size={"35px"} color="grey" />
            </button>
            <Drawer
              className="fixed top-0  z-50  left-0 shadow-lg"
              open={open}
              placement={"left"}
              onClose={closeDrawer}
              overlay={false}
            >
              <div>
                <div className="mx-10  lg:w-[300px]   md:w-[200px]  w-fit">
                  <div className="h-full py-7">
                    <div className="w-full">
                      <div class="relative z-0 w-full mb-2  group">
                        <input
                          type="text"
                          class="block py-2.5 px-0 w-full text-md text-black  border-0 border-b-2 bg-transparent  dark:focus:border-pink-700 focus:outline-none focus:ring-0 focus:border-pink-700 peer"
                          placeholder=" "
                        />
                        <label
                          for="floating_email"
                          class="peer-focus:font-medium absolute text-md text-gray-200  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-pink-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Search products
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-black text-xl mb-12">
                      Filter by price
                    </h2>
                  </div>
                  <div>
                    <Slider
                      className="sliders"
                      thumbClassName="thumb"
                      ariaLabel={["Lower thumb", "Upper thumb"]}
                      ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                      renderThumb={(props, state) => (
                        <div {...props}>
                          <span className="text-pink-700 absolute -top-5 -left-2 ">
                            {state.valueNow}
                          </span>
                        </div>
                      )}
                      pearling
                      minDistance={1400}
                    />
                  </div>

                  <div className="w-full mt-4">
                    <div id="accordionExample">
                      <div className="bg-white   ">
                        <h2
                          className="mb-0 text-black text-xl mt-7 "
                          id="headingOne"
                        >
                          <button
                            className={`${
                              activeElement === "element1" &&
                              `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:text-pink-700 text-black text-xl mt-7 `
                            } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left  transition [overflow-anchor:none] hover:z-[2] focus:z-[3] text-black text-xl mt-7 focus:outline-none`}
                            type="button"
                            onClick={() => handleClick("element1")}
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Filter by category
                            <span
                              className={`${
                                activeElement === "element1"
                                  ? `rotate-[-180deg] -mr-1`
                                  : `rotate-0 fill-[#212529]  dark:fill-white`
                              } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                              </svg>
                            </span>
                          </button>
                        </h2>
                        <TECollapse
                          show={activeElement === "element1"}
                          className="!mt-0 !rounded-b-none !shadow-none"
                        >
                          <div className="px-5 py-4 flex flex-col">
                            {categories?.result?.rows?.map((category) => {
                              return (
                                <p
                                  className="my-1"
                                  key={category.id}
                                  onClick={() => {
                                    handleCategories;
                                  }}
                                >
                                  {category.title}
                                </p>
                              );
                            })}
                          </div>
                        </TECollapse>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Drawer>
          </section>
          <div>
            {isPending ? (
              <p>loading...</p>
            ) : error ? (
              <p>no products found</p>
            ) : (
              <div class="grid mb-5 grid-cols-1 gap-7 mx-16   md:p-18  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   md:gap-4 md:m-10 md:p-0">
                {rItems &&
                  rItems?.map((allProd) => {
                    return (
                      <div class=" w-sm  rounded  shadow-lg " key={allProd.id}>
                        <div className="bg-slate-200">
                          {allProd.discount == 0 ? (
                            ""
                          ) : (
                            <span class="rounded-md w-10 absolute px-2 py-[3px] text-white bg-pink-700">
                              ${allProd.discount}
                            </span>
                          )}
                          <img
                            class="md:w-full w-[300px] py-9"
                            src={grocc}
                            alt="Sunset in the mountains"
                          ></img>
                        </div>
                        <div className="px-3 pt-2 pb-2">
                          <h4 class="text-black font-semibold text-lg ">
                            {allProd.title}
                          </h4>
                          {allProd.discount == 0 ? (
                            <span class="mr-4 ">${allProd.price}</span>
                          ) : (
                            <div>
                              <span class="mr-2 line-through ">
                                ${allProd.price}
                              </span>
                              <span class="text-pink-700 font-semibold">
                                ${allProd.price - allProd.discount}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          {cartItems.find((item) => item.id === allProd.id) ? (
                            <button
                              disabled
                              className="text-white px-3 mr-2 py-2 text-sm my-4 -mt-1 float-right rounded-m bg-gray-300"
                            >
                              Added to cart
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                handleAddToCart(allProd);
                              }}
                              className="text-white px-3 mr-2 py-2 text-sm my-4 -mt-1 float-right rounded-m bg-pink-700"
                            >
                              Add to cart
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AllItems;
