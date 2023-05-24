import Head from "next/head";
import { useState } from "react";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { parseCookies } from "../../helpers";
import ClientNavbar from "../../components/ClientNavbar.js";
import RichTextEditor from "../../components/RichTextEditor";
import { PrimaryTagChoices } from "../../helpers/primary_tag_choices";
import { JobTypeChoices } from "../../helpers/job_type_choices";
import { WorkTypeChoices } from "../../helpers/work_type_choices";

export default function JobDetials({ jobData, clientData }) {
  const [jobTitle, setjobTitle] = useState(jobData.job_title);
  const [jobType, setjobType] = useState(jobData.job_type);
  const [jobWorkspaceType, setjobWorkspaceType] = useState(
    jobData.job_workspace_type
  );
  const [jobPrimaryTag, setjobPrimaryTag] = useState(jobData.job_primary_tag);
  const [JobTags, setJobTags] = useState(jobData.job_tags.toString());
  const [jobLocations, setjobLocations] = useState(
    jobData.job_locations.toString()
  );
  const [jobSalary, setjobSalary] = useState(jobData.job_salary);
  const [jobApplyUrl, setjobApplyUrl] = useState(jobData.job_apply_url);
  const [jobDescription, setjobDescription] = useState(jobData.job_description);

  const [jobPostStatus, setjobPostStatus] = useState(false);
  const jobStatus = jobPostStatus == false ? jobData.job_status : "Finished";
  const client = clientData.id;
  const jobID = jobData.id;
  const JobPostedAt = jobData.job_posted_at;

  const editorValue = (value) => {
    setjobDescription(value);
  };

  const updateJob = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put("/api/jobs/update", {
          jobID,
          client,
          jobStatus,
          jobTitle,
          jobType,
          jobWorkspaceType,
          jobPrimaryTag,
          JobTags,
          jobLocations,
          jobSalary,
          jobApplyUrl,
          jobDescription,
          JobPostedAt,
        })
        .then(function (_) {
          toast.success("Updated job post");
        })
        .catch(function (error) {
          toast.warn("Something went wrong");
        });
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

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

      <ToastContainer />

      <main className="bg-[#f7f7f7] min-h-screen pt-6 pb-24 sm:pl-4 md:pl-12 lg:pl-20">
        <div className="flex justify-between items-center mb-3 mx-5 w-[360px] md:w-[550px] lg:w-[650px]">
          <h2 className="text-2xl text-[#FF6464]">JOB: {jobData.id}</h2>

          <Link
            href="/client-dashboard"
            className="px-2.5 py-1.5 bg-[#009dffab] text-white font-bold text-lg rounded-lg"
          >
            Back to jobs
          </Link>
        </div>

        <form onSubmit={updateJob}>
          <label htmlFor="name" className="text-gray-700 ml-5">
            Position
          </label>
          <input
            id="name"
            type="text"
            className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
            name="name"
            placeholder="Enter position title"
            value={jobTitle}
            onChange={(e) => setjobTitle(e.target.value)}
          />
          <label className="text-gray-700 ml-5">Job Type</label>
          <div className="inline-block ml-3 w-56">
            <Select
              id="long-value-select"
              instanceId="long-value-select"
              defaultValue={{
                label: jobData.job_type,
                value: jobData.job_type,
              }}
              options={JobTypeChoices}
              onChange={(selectedOption) => setjobType(selectedOption.value)}
              placeholder="Select job type."
            />
          </div>
          <div className="mt-4"></div>
          <label className="text-gray-700 ml-5">Workspace Type</label>
          <div className="inline-block ml-3 w-56">
            <Select
              id="long-value-select"
              instanceId="long-value-select"
              defaultValue={{
                label: jobData.job_workspace_type,
                value: jobData.job_workspace_type,
              }}
              options={WorkTypeChoices}
              onChange={(selectedOption) =>
                setjobWorkspaceType(selectedOption.value)
              }
              placeholder="Workspace type."
            />
          </div>
          <div className="mt-4"></div>
          <label className="text-gray-700 ml-5">Primary Tag</label>
          <div className="w-[360px] mx-5 md:w-[550px] lg:w-[650px]">
            <Select
              id="long-value-select"
              instanceId="long-value-select"
              defaultValue={{
                label: jobData.job_primary_tag,
                value: jobData.job_primary_tag,
              }}
              options={PrimaryTagChoices}
              onChange={(selectedOption) =>
                setjobPrimaryTag(selectedOption.value)
              }
              placeholder="primary job category."
            />
          </div>
          <div className="mt-4"></div>
          <label htmlFor="jobtags" className="text-gray-700 ml-5">
            Job Tags: Enter as comma-separated
          </label>
          <input
            id="jobtags"
            type="text"
            className="block border border-grey-light w-[360px] mx-5 md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
            name="jobtags"
            placeholder="Tag One, Tag Two, etc."
            value={JobTags}
            onChange={(e) => setJobTags(e.target.value)}
          />
          <label htmlFor="joblocations" className="text-gray-700 ml-5">
            Job Locations: Enter as comma-separated
          </label>
          <input
            id="joblocations"
            type="text"
            className="block border border-grey-light w-[360px] mx-5 md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
            name="joblocations"
            placeholder="example: City Country, City Country,"
            value={jobLocations}
            onChange={(e) => setjobLocations(e.target.value)}
          />
          <label htmlFor="jobsalary" className="text-gray-700 ml-5">
            Salary
          </label>
          <input
            id="jobsalary"
            type="text"
            className="block border border-grey-light w-[360px] mx-5 md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
            name="jobsalary"
            placeholder="USD 1,000 per month or USD 10 per hour"
            value={jobSalary}
            onChange={(e) => setjobSalary(e.target.value)}
          />
          <label htmlFor="applyurl" className="text-gray-700 ml-5">
            Apply Email
          </label>
          <p className="text-gray-800 ml-5 mb-0.5 text-sm md:text-base lg:text-base">
            mailto:email@domain.com or https://domain.com/job
          </p>
          <input
            id="applyurl"
            type="text"
            className="block border border-grey-light w-[360px] mx-5 md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
            name="applyurl"
            placeholder="please enter correctly"
            value={jobApplyUrl}
            onChange={(e) => setjobApplyUrl(e.target.value)}
          />
          <label className="text-gray-700 ml-5">Description</label>
          <p className="text-gray-800 ml-5 mb-1 w-[360px] mx-5 md:w-[550px] lg:w-[650px] text-sm md:text-base lg:text-base">
            Job details like requirements, responsibilities, benefits, how to
            apply and etc.
          </p>
          <div className="mx-5 w-[900px] overflow-hidden">
            <RichTextEditor
              initialValue={jobDescription}
              getValue={editorValue}
            />
          </div>

          <div className="mx-5 w-[360px] md:w-[550px] lg:w-[650px] mt-10 mb-5">
            <div className="flex items-center mb-2">
              <input
                id="stop"
                type="checkbox"
                className="w-4 h-4 text-blue-600 rounded"
                value={jobPostStatus}
                onChange={() => setjobPostStatus(!jobPostStatus)}
              />
              <label htmlFor="stop" className="ml-2 font-medium text-gray-900">
                Stop or suspend job post
              </label>
            </div>
            <h3>
              Job Posted At:{" "}
              <span className="text-gray-900 text-lg font-bold">
                {jobData.job_posted_at}
              </span>
            </h3>
            <h3>
              Job Featured:{" "}
              <span className="text-gray-900 text-lg font-bold">
                {jobData.is_featured
                  ? jobData.featured
                  : "Job post not featured"}
              </span>
            </h3>
            <h3>
              Job Email Blasted:{" "}
              <span className="text-gray-900 text-lg font-bold">
                {jobData.email_blasted ? "Sent email to candidates" : "No"}
              </span>
            </h3>
          </div>

          <button
            type="submit"
            className="w-[360px] mx-5 md:w-[550px] lg:w-[650px] mt-3 px-10 py-1.5 rounded-md bg-[#57C4E5] text-white font-semibold text-lg"
          >
            Update Job Post
          </button>
        </form>
      </main>
    </>
  );
}

export async function getServerSideProps({ req, params }) {
  const job = params.job;

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

  const clientData = await fetch(process.env.CLIENT_ACCOUNT_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  const jobData = await fetch(`${process.env.JOBS_API}${job}/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  return {
    props: {
      jobData,
      clientData,
    },
  };
}
