import { Link } from "react-router-dom";
import groc from "../assets/grocc-rem.png";
const Hero = () => {
  return (
    <div className="bg-white">
      <div class="mb-3 ">
        <div className="container">
          <div class="grid max-w-full py-40  lg:gap-12 xl:gap-20  lg:grid-cols-2">
            <div class=" p-6   place-self-center lg:col-span-1">
              <h1 class="max-w-2xl  mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-pink-700">
                Grocery Store
              </h1>
              <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad sed
                laudantium perferendis dignissimos, nulla ipsa veniam, placeat
                asperiores facere aut quasi delectus labore temporibus ratione
                fuga? Perspiciatis mollitia consectetur autem?
              </p>
              <Link
                to="/all"
                class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Shop Now
                <svg
                  class="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
            <div class="hidden  lg:col-span-1  lg:ml-24 lg:flex">
              <img src={groc} alt="mockup"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
