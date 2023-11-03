import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineMail,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import productImage from "../assets/google.png";
import productsImage from "../assets/download.png";

const Footer = () => {
  return (
    <section class=" bg-slate-100 ">
      <div className="h-full w-full  container mx-auto">
        <div class="border-b">
          <h2 class="text-black font-semibold text-[25px] pt-5">Top Brands</h2>
        </div>
        <div class="flex flex-wrap gap-3  border-b py-9">
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
          <p>Knorr</p>
        </div>
        <div class="flex flex-wrap justify-between  gap-y-6 mt-12 w-full">
          <div class="min-w-[10rem]">
            <h3 class="text-black text-[18px] font-semibold">Company</h3>
            <div class="flex flex-col">
              <a href="">About</a>
              <a href="">Location</a>

              <a href="">Reviews & rating</a>
            </div>
          </div>
          <div class="min-w-[10rem]">
            <h3 class="text-black text-[18px] font-semibold">Follow us on</h3>
            <div class="flex flex-col">
              <a class="flex flex-row" href="">
                <div class="mt-1">
                  <AiFillFacebook />
                </div>
                Facebook
              </a>
              <a class="flex flex-row mt-1" href="">
                <div class="mt-1">
                  <AiFillInstagram />
                </div>
                Instagram
              </a>
            </div>
          </div>
          <div class="min-w-[10rem]">
            <h3 class="text-black text-[18px] font-semibold">Contact Us</h3>

            <div class="flex flex-col">
              <a class="flex flex-row" href="">
                <div class="mt-1">
                  <AiOutlineMail />
                </div>
                jiffy.co@gmail.com
              </a>

              <a class="flex flex-row mt-2" href="">
                <div class="mt-1">
                  <AiOutlineWhatsApp />
                </div>
                +92-3315671239
              </a>
            </div>
          </div>
          <div class="min-w-[10rem]">
            <h3 class="text-black text-[18px] font-semibold">Useful Links</h3>
            <div class="flex flex-col">
              <a href="">Privacy Policy</a>
              <a href="">Terms & Conditions</a>

              <a href="">FAQs</a>
            </div>
          </div>
          <div class="min-w-[10rem] ">
            <h3 class="text-black text-[18px] font-semibold">
              Download the app
            </h3>
            <div class="flex flex-col">
              <a class="bg-slate-100" href="">
                <img class=" h-18 w-40" src={productImage} />
              </a>
              <a class="" href="">
                <img class=" ml-2  h-12 w-36" src={productsImage} />
              </a>
              <div class=" my-3 flex flex-row">
                <p>Developed by </p>
                <p class="text-pink-700 ml-1  underline"> Infinitybits </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-pink-700">
        <p className="font-thin py-2 text-center text-white">
          Jiffy's Pakistan
        </p>
      </div>
    </section>
  );
};

export default Footer;
