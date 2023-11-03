import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";

const PasswordOtp = ({ email }) => {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState();
  const [otpSent, setOtpSent] = useState(false);
  const submitButton = async (e) => {
    e.preventDefault();
    try {
      console.log("email:", email, "otp:", otp);
      const response = await axios.post(
        "http://localhost:3002/api/client/verify-forget-password",
        {
          email: email,
          otp: otp,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // navigate("/signin");
      setOtpSent(true);

      console.log("data", response.data.result.tokenInfo);
      const token = response.data.result.tokenInfo;
      localStorage.setItem("otp", otp);
      localStorage.setItem("token", token);
      //   console.log("access token", response.accessToken);
      //   console.log("response", JSON.stringify(response));
    } catch (err) {
      console.log("error:", err);
      //   if (!err?.response) {
      //     setError("No server response");
      //   } else if (err.response?.status === 400) {
      //     setError("username taken");
      //   } else {
      //     setError("registration failed");
      //   }
    }
  };
  return (
    <div>
      {!otpSent ? (
        <div className="bg-white container mx-auto my-16">
          <div class="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
            <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
              <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
                <div class="flex flex-col items-center justify-center text-center space-y-2">
                  <div class="font-semibold text-3xl">
                    <p>Email Verification To Change Password</p>
                  </div>
                  <div class="flex flex-row text-sm font-medium text-gray-400">
                    <p>We have sent a code to your email {email}</p>
                  </div>
                </div>

                <div>
                  <form action="" method="post">
                    <div class="flex flex-col space-y-16">
                      <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                        <div class="w-72 h-16 ">
                          <input
                            class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-pink-700"
                            type="tel"
                            name="otp"
                            id=""
                            maxLength={7}
                            onChange={(e) => setOtp(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="flex flex-col space-y-5">
                        <div>
                          <button
                            onClick={(e) => submitButton(e)}
                            class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-pink-700 border-none text-white text-sm shadow-sm"
                          >
                            Verify Otp
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ChangePassword />
      )}
    </div>
  );
};

export default PasswordOtp;
