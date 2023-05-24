import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import WebNavbar from "../../components/WebNavbar";
import SubscribeComponent from "../../components/SubscribeComponent";

export default function JobDetials({ jobData }) {
  const [showSubscribe, setshowSubscribe] = useState(true);

  return (
    <>
      <Head>
        <title>{jobData[0].job_title} | Job Board</title>
        <meta
          name="description"
          content="Job Board help you find your dream job or hire create talent."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WebNavbar />

      <main className="bg-[#202020] min-h-screen pt-3 pb-24">
        <div className="flex flex-col md:flex-row md:items-start md:mx-14 lg:flex-row lg:mx-28">
          <div className="bg-[#1d1c1c] border-[#3f3f3f] border-2 px-2 py-2 rounded-lg mx-auto w-[380px] md:w-[550px] lg:w-[900px] mb-5">
            <div className="flex items-start justify-between">
              <div className="flex flex-1">
                <div className="bg-white grid place-items-center rounded-full h-10 w-10 md:h-14 md:w-14 lg:h-14 lg:w-14 mr-2">
                  {jobData[0].logo ? (
                    <Image
                      src={jobData[0].logo}
                      alt="Job Board Logo"
                      style={{ objectFit: "cover" }}
                      width={44}
                      height={44}
                      className="rounded-full"
                    />
                  ) : (
                    <h3 className="text-black font-bold text-2xl">
                      {jobData[0].job_title[0]}
                    </h3>
                  )}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-gray-100 text-lg font-bold capitalize">
                    {jobData[0].job_title}
                  </h3>
                  <h4 className="text-gray-400 capitalize">
                    {jobData[0].client_name}{" "}
                    {jobData[0].is_featured == true ? (
                      <span className="bg-[#FF1E1E] text-white font-black px-2 py-0.5 ml-0.5 rounded-sm">
                        Top
                      </span>
                    ) : (
                      ""
                    )}
                  </h4>
                  <h5 className="text-gray-300 border border-gray-800 max-w-fit -ml-1 rounded-sm px-1.5 py-0.5 mr-3">
                    <span className="text-gray-400">Posted: </span>
                    {jobData[0].job_posted_at}
                  </h5>
                  <h5 className="text-gray-300 border border-gray-800 max-w-fit -ml-1 rounded-sm px-1.5 py-0.5 mr-3">
                    <span className="text-gray-400">Salary: </span>
                    {jobData[0].job_salary}
                  </h5>
                </div>
              </div>

              <Link
                href={jobData[0].job_apply_url}
                className="bg-[#009EFF] px-5 py-1 mr-1 mt-1 rounded-sm text-white font-bold"
              >
                Apply
              </Link>
            </div>
            <div className="ml-11 mt-3 flex flex-wrap">
              {jobData[0].job_locations.map((local) => {
                return (
                  <h5
                    key={local}
                    className="bg-[#aaaaaaf5] text-gray-900 max-w-fit max-h-fit rounded-sm px-1.5 py-0.5 mr-3 mt-1"
                  >
                    {local}
                  </h5>
                );
              })}{" "}
            </div>
            <div className="ml-11 flex flex-wrap">
              <h5 className="bg-[#aaaaaac7] text-gray-900 max-w-fit max-h-fit rounded-sm px-1.5 py-0.5 mr-3 mt-2">
                {jobData[0].job_type}
              </h5>
              <h5 className="bg-[#aaaaaac7] text-gray-900 max-w-fit max-h-fit rounded-sm px-1.5 py-0.5 mr-3 mt-2">
                {jobData[0].job_workspace_type}
              </h5>
            </div>
            <div className="flex flex-wrap ml-11 mt-5">
              <h5 className="bg-[#414141] text-gray-300 max-w-fit max-h-fit rounded-sm px-1.5 py-0.5 mr-3 mt-1">
                {jobData[0].job_primary_tag}
              </h5>
              {jobData[0].job_tags.map((tag) => {
                return (
                  <h5
                    key={tag}
                    className="bg-[#414141] text-gray-300 max-w-fit max-h-fit rounded-sm px-1.5 py-0.5 mr-3 mt-1"
                  >
                    {tag}
                  </h5>
                );
              })}
            </div>
            <div className="w-full mx-auto px-11 mt-7">
              <h3 className="text-gray-200 font-bold md:text-2xl mb-1">
                Job Description
              </h3>
              <p
                className="text-gray-300"
                dangerouslySetInnerHTML={{
                  __html: jobData[0].job_description,
                }}
              />
            </div>
            <br />
          </div>
          <div className="bg-[#1d1c1c] border-[#3f3f3f] border-2 px-2 py-5 rounded-lg mx-auto w-[380px] md:w-[300px] md:ml-10 lg:w-[300px] lg:ml-10">
            <div className="flex flex-col items-center">
              <div className="w-[120px] h-[120px] bg-white grid place-items-center rounded-full">
                {jobData[0].logo ? (
                  <Image
                    src={jobData[0].logo}
                    alt="Job Board Logo"
                    style={{ objectFit: "cover" }}
                    width={96}
                    height={96}
                    className="rounded-full h-24"
                  />
                ) : (
                  <h3 className="text-black font-bold text-5xl">
                    {jobData[0].job_title[0]}
                  </h3>
                )}
              </div>
              <h3 className="text-gray-200 capitalize text-lg mt-2">
                {jobData[0].client_name}
              </h3>
              <h3 className="text-gray-200 text-lg mt-2">
                {jobData[0].client_contact}
              </h3>
              <Link
                href={jobData[0].client_website}
                className="text-gray-300 font-bold pointer-cursor border-b-2 border-gray-400 text-lg mt-2"
              >
                Website
              </Link>
              <br />
            </div>
          </div>
        </div>
      </main>
      {showSubscribe ? (
        <SubscribeComponent closeBtn={() => setshowSubscribe(false)} />
      ) : (
        ""
      )}
    </>
  );
}

export async function getServerSideProps({ params }) {
  const job = params.job;
  const jobData = await fetch(`${process.env.GET_JOBS_API}${job}/`, {
    method: "GET",
  }).then(async (res) => await res.json());

  return {
    props: {
      jobData,
    },
  };
}
