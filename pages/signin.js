import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [otpDisabled, setotpDisabled] = useState(true);
  const [showInfo, setshowInfo] = useState(false);

  const sendOTPMethod = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("/api/auth/signin", {
          email,
        })
        .then(function (_) {
          setotpDisabled(false);
          setshowInfo(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

  const signInMethod = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("/api/auth/verify", {
          email,
          otp,
        })
        .then(function (_) {
          router.push("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In | Job Board</title>
        <meta
          name="description"
          content="Job Board help you find your dream job or hire create talent."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Sign In</h1>
              <form onSubmit={otpDisabled ? sendOTPMethod : signInMethod}>
                <input
                  type="email"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="otp"
                  placeholder="OTP Code"
                  required
                  maxLength={4}
                  disabled={otpDisabled}
                  onChange={(e) => setOTP(e.target.value)}
                />

                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-[#009EFF] font-bold text-white hover:bg-[#0086da] my-1"
                >
                  {otpDisabled ? "Continue" : "Sign In"}
                </button>
              </form>

              <div className="text-grey-dark mt-6 text-base text-center">
                Don&apos;t have an account? &nbsp;
                <Link href="/signup" className="no-underline text-blue-700">
                  Create Now
                </Link>
              </div>

              <div
                className="text-center mt-6 w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow space-x dark:bg-blue-800"
                style={{
                  display: showInfo ? "block" : "none",
                }}
                role="alert"
              >
                <div className=" text-sm font-bold text-white ">
                  We&apos;ve sent OTP Code to your email! Enter to sign in.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
