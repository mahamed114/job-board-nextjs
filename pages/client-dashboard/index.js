import Head from "next/head";
import Link from "next/link";

import { parseCookies } from "../../helpers";
import ClientNavbar from "../../components/ClientNavbar.js";

export default function ClientDashboard({ jobsData }) {
  return (
    <>
      <Head>
        <title>Client Dashboard | Job Board</title>
        <meta
          name="description"
          content="Job Board help you find your dream job or hire create talent."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ClientNavbar />

      <main className="bg-[#f7f7f7] min-h-screen pt-6 pb-24 sm:pl-4 md:pl-12 lg:pl-20">
        <div className="flex justify-between items-center mx-auto w-[380px] md:w-[550px] lg:w-[650px]">
          <div className="flex items-center">
            <h2 className="text-2xl text-[#FF6464] mr-7">Posted Jobs</h2>
          </div>
          <Link
            href="/client-dashboard/post-job"
            className="px-2.5 py-1.5 bg-[#009EFF] text-white font-bold text-lg rounded-lg"
          >
            Post New Job
          </Link>
        </div>
        <br />
        {jobsData.map((job) => {
          return (
            <div
              key={job.id}
              className="bg-[#009EFF] px-2 py-3 rounded-lg mx-auto w-[380px] md:w-[550px] lg:w-[650px] mb-5"
            >
              <div className="flex flex-col mr-12">
                <h3 className="text-white text-2xl font-bold capitalize">
                  {job.job_title}
                </h3>
                <h4 className="text-gray-200 font-bold">{job.job_posted_at}</h4>
                <h4 className="text-black font-bold uppercase mb-3">
                  {job.job_status}
                </h4>
                <Link href={`/client-dashboard/${job.id}`}>
                  <p className="bg-white text-blue-600 text-center inline-block rounded-md px-5 py-1">
                    Details
                  </p>
                </Link>
              </div>
            </div>
          );
        })}
        <div className="mb-12"></div>
      </main>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const { access } = parseCookies(req);

  if (!access) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const userType = await fetch(process.env.GET_USER_TYPE_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  if (userType.client == false) {
    return {
      redirect: {
        destination: "/talent-profile",
        permanent: false,
      },
    };
  }

  const jobsData = await fetch(process.env.JOBS_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  return {
    props: {
      jobsData,
    },
  };
}
