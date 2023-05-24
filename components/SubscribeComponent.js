import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SubscribeComponent({ closeBtn }) {
  const [email, setEmail] = useState();

  const subscribeTalent = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("/api/talent/subscribe", {
          email,
        })
        .then(function () {
          setEmail("");
          toast.success("Subscribed successfully");
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
      <ToastContainer />

      <div className="fixed bottom-0 left-0 z-20 w-full p-3 bg-[#1d1c1c] border-t border-gray-600 shadow">
        <div className="mx-auto w-[380px] md:w-[550px] lg:w-[550px]">
          <div className="flex items-center">
            <h2 className="text-center text-[#00E7FF] mb-1 text-md md:text-lg lg:text-lg">
              Get jobs sent to your email
            </h2>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-400 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="defaultModal"
              onClick={closeBtn}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={subscribeTalent}>
            <div className="relative">
              <input
                type="email"
                className="block w-full p-2 text-sm text-gray-200 border border-gray-600 rounded-lg bg-[#202020]"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="text-gray-900 absolute right-0.5 bottom-0.5 bg-[#00e5ff] hover:bg-[#10a7b8] font-bold rounded-lg text-sm px-4 py-2"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
