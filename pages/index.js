import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import WebNavbar from "../components/WebNavbar";
import SubscribeComponent from "../components/SubscribeComponent";

export default function Home({ jobsData }) {
  const [showSubscribe, setshowSubscribe] = useState(true);
  const [showPostCTA, setshowPostCTA] = useState(true);
  const [searchTitle, setsearchTitle] = useState();

  const searchJobByTitle = async (e) => {
    e.preventDefault();

    setsearchTitle("");
  };

  return (
    <>
      <Head>
        <title>Find your dream job | Job Board</title>
        <meta
          name="description"
          content="Job Board help you find your dream job or hire create talent."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WebNavbar />

      <main className="bg-[#202020] min-h-screen pt-3 pb-24">
        <div className="mx-auto w-[380px] md:w-[550px] lg:w-[900px] mb-5">
          {showPostCTA ? (
            <div className="bg-red-800 rounded-md grid place-items-center font-bold mx-auto w-[380px] md:w-[550px] lg:w-[900px] mb-3">
              <div className="w-full px-3 py-1 flex justify-between">
                <Link
                  href="/signup"
                  className="text-gray-100 text-lg md:text-2xl lg:text-3xl"
                >
                  Post Your Job
                </Link>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-400 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
                  data-modal-toggle="defaultModal"
                  onClick={() => setshowPostCTA(false)}
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
            </div>
          ) : (
            ""
          )}

          <h1 className="text-gray-300 text-center font-bold text-2xl mb-1">
            Find your dream job
          </h1>

          <form onSubmit={searchJobByTitle}>
            <label
              htmlFor="search-box"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="search-box"
                className="block w-full p-4 pl-10 text-sm text-gray-200 border border-gray-600 rounded-lg bg-gray-800"
                placeholder="Search Job..."
                value={searchTitle}
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <h1 className="mt-5 text-gray-100 text-2xl grid place-items-center">
          Latest Jobs
        </h1>

        {jobsData
          ? jobsData.map((job) => {
              return (
                <div
                  key={job.id}
                  className="bg-[#1d1c1c] border-[#3f3f3f] border-2 flex items-center justify-between px-2 py-2 rounded-lg mx-auto w-[380px] md:w-[550px] lg:w-[900px] mb-5"
                >
                  <div className="flex flex-1">
                    <div className="bg-gray-300 grid place-items-center rounded-full h-11 w-11 md:h-14 md:w-14 lg:h-14 lg:w-14 mr-2">
                      {job.logo ? (
                        <Image
                          src={job.logo}
                          alt="Job Board Logo"
                          style={{ objectFit: "cover" }}
                          width={44}
                          height={44}
                          className="rounded-full"
                        />
                      ) : (
                        <h3 className="text-black font-bold text-2xl">
                          {job.job_title[0]}
                        </h3>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-gray-300 text-lg font-bold capitalize">
                        {job.job_title}
                      </h3>
                      <h4 className="text-gray-400 capitalize">
                        {job.client_name}{" "}
                        {job.is_featured == true ? (
                          <span className="bg-[#FF1E1E] text-white font-black px-2 py-0.5 ml-0.5 rounded-sm">
                            Top
                          </span>
                        ) : (
                          ""
                        )}
                      </h4>
                      <div className="flex flex-wrap mt-1">
                        <h5 className="text-gray-400 border border-gray-700 max-w-fit rounded-sm px-1.5 py-0.5 mr-3">
                          {job.job_locations[0]}
                        </h5>
                        <h4 className="text-gray-400 border border-gray-700 max-w-fit rounded-sm px-1.5 py-0.5">
                          {job.job_primary_tag}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="mr-1">
                    <h4 className="text-gray-300 font-bold mb-1">
                      {job.job_posted_at.substring(0, 6)}
                    </h4>
                    <Link
                      href={`/jobs/${job.id}`}
                      className="bg-[#009dffd7] px-5 py-1 rounded-sm text-gray-100 font-bold"
                    >
                      Apply
                    </Link>
                  </div>
                </div>
              );
            })
          : ""}
        {showSubscribe ? (
          <SubscribeComponent closeBtn={() => setshowSubscribe(false)} />
        ) : (
          ""
        )}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const jobsData = await fetch(process.env.GET_JOBS_API, {
    method: "GET",
  }).then(async (res) => await res.json());

  return {
    props: {
      jobsData,
    },
  };
}
