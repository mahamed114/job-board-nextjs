import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Unsubscribe() {
  const [email, setEmail] = useState();

  const unSubscribeTalent = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("/api/talent/unsubscribe", {
          email,
        })
        .then(function () {
          setEmail("");
          toast.success("Unsubscribed successfully");
        })
        .catch(function (_) {
          setEmail("");
          toast.warn("Something went wrong!");
        });
    } catch (_) {
      toast.warn("Something went wrong!");
    }
  };

  return (
    <>
      <Head>
        <title>Unsubscribe | Job Board</title>
        <meta
          name="description"
          content="Job Board help you find your dream job or hire create talent."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer />

      <main className="bg-gray-200 min-h-screen min-w-full grid place-items-center px-3">
        <div className="mx-auto w-[380px]">
          <h1 className="text-center text-red-600 text-lg mb-2">
            Enter your email to unsubscribe
          </h1>
          <form onSubmit={unSubscribeTalent}>
            <input
              type="email"
              className="block w-full p-3 text-black border border-gray-400 rounded-lg"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-red-400 py-1 rounded-md mt-2 text-white"
            >
              Unsubscribe
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
