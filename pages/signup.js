import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [isTalent, setisTalent] = useState(true);
  const [isClient, setisClient] = useState(false);
  const [otpDisabled, setotpDisabled] = useState(true);
  const [showInfo, setshowInfo] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const talent =
      isTalent.toString().charAt(0).toUpperCase() +
      isTalent.toString().slice(1);

    const client =
      isClient.toString().charAt(0).toUpperCase() +
      isClient.toString().slice(1);

    try {
      await axios
        .post("/api/auth/signup", {
          email,
          talent,
          client,
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

  const signUpVerify = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("/api/auth/verify", {
          email,
          otp,
        })
        .then(function (_) {
          if (isTalent) {
            router.push("/talent-profile");
          } else if (isClient) {
            router.push("/client-dashboard");
          }
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
        <title>Sign Up | Job Board</title>
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
              <h1 className="mb-8 text-3xl text-center">Create Account</h1>
              <form
                id="form"
                onSubmit={otpDisabled ? handleSignUp : signUpVerify}
              >
                <div className="flex items-center mb-1">
                  <input
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    id="talent"
                    type="radio"
                    value="Talent"
                    name="type"
                    checked={isTalent ? true : false}
                    onChange={() => {
                      setisClient(false);
                      setisTalent(!isTalent);
                    }}
                    required
                  />
                  <label
                    htmlFor="talent"
                    className="ml-2 text-base font-semibold text-gray-900"
                  >
                    Talent or job seeker
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    id="client"
                    type="radio"
                    value="client"
                    name="type"
                    checked={isClient ? true : false}
                    onChange={() => {
                      setisTalent(false);
                      setisClient(!isClient);
                    }}
                    required
                  />
                  <label
                    htmlFor="client"
                    className="ml-2 text-base font-semibold text-gray-900"
                  >
                    Company{" "}
                  </label>
                </div>
                <input
                  type="email"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  value={email}
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
                  value={otp}
                  maxLength={4}
                  disabled={otpDisabled}
                  onChange={(e) => setOTP(e.target.value)}
                />

                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-[#009EFF] font-bold text-white hover:bg-[#0086da] my-1"
                >
                  {otpDisabled ? "Continue" : "Sign Up"}
                </button>
              </form>
              <div className="mt-8"></div>

              <div className="text-grey-dark mt-6 text-base text-center">
                Already have an account? &nbsp;
                <Link href="/signin" className="no-underline text-blue-700">
                  Sign In
                </Link>
              </div>

              <div
                style={{
                  display: showInfo ? "block" : "none",
                }}
                className="flex mt-6 justify-center items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow space-x dark:bg-blue-800"
                role="alert"
              >
                <div className=" text-sm font-bold text-white text-center flex self-center">
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
