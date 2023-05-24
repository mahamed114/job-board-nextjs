import Head from "next/head";
import { useState } from "react";

import axios from "axios";
import Link from "next/link";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { parseCookies } from "../../helpers";
import RichTextEditor from "../../components/RichTextEditor";
import ClientNavbar from "../../components/ClientNavbar";
import { PrimaryTagChoices } from "../../helpers/primary_tag_choices";
import { JobTypeChoices } from "../../helpers/job_type_choices";
import { WorkTypeChoices } from "../../helpers/work_type_choices";

export default function PostJob({ clientID, access }) {
  const [jobTitle, setjobTitle] = useState();
  const [jobType, setjobType] = useState();
  const [jobWorkspaceType, setjobWorkspaceType] = useState();
  const [jobPrimaryTag, setjobPrimaryTag] = useState();
  const [JobTags, setJobTags] = useState([]);
  const [jobLocations, setjobLocations] = useState();
  const [jobSalary, setjobSalary] = useState();
  const [jobApplyUrl, setjobApplyUrl] = useState();
  const [jobDescription, setjobDescription] = useState();
  const [jobFeatured, setjobFeatured] = useState("");
  const [jobEmailBlasted, setjobEmailBlasted] = useState(false);
  const [featuredPrice, setfeaturedPrice] = useState(0);
  const [clientName, setclientName] = useState();
  const [clientContact, setclientContact] = useState();
  const [clientWebsite, setclientWebsite] = useState();
  const [invoiceName, setinvoiceName] = useState();
  const [invoiceAddress, setinvoiceAddress] = useState();
  const [invoiceContact, setinvoiceContact] = useState();

  const editorValue = (value) => {
    setjobDescription(value);
  };

  const d = new Date();
  const day = d.getDate();
  const month = d.toLocaleString("default", { month: "short" });
  const year = d.getFullYear();
  const jobPostedAt = day + "-" + month + "-" + year;
  const is_featured = jobFeatured == undefined ? "False" : "True";

  const jobBlastPrice = 0;
  const jobPostPrice = 0;
  const jobDayFeaturePrice = 0;
  const jobWeekFeaturePrice = 0;
  const jobMonthFeaturePrice = 0;

  let blastPrice = jobEmailBlasted == false ? 0 : jobBlastPrice;
  const totalPrice = jobPostPrice + featuredPrice + blastPrice;

  const postJob = async (e) => {
    e.preventDefault();

    let inputImage = document.querySelector("#imageInput");
    let image = inputImage.files[0];
    let formData = new FormData();

    if (image != undefined) {
      formData.append("logo", image);
    }

    formData.append("posted_by", clientID);
    formData.append("job_title", jobTitle);
    formData.append("job_type", jobType);
    formData.append("job_workspace_type", jobWorkspaceType);
    formData.append("job_primary_tag", jobPrimaryTag);
    formData.append("job_tags", [JobTags]);
    formData.append("job_locations", [jobLocations]);
    formData.append("job_salary", jobSalary);
    formData.append("job_apply_url", jobApplyUrl);
    formData.append("job_description", jobDescription);
    formData.append("job_posted_at", jobPostedAt);
    formData.append("featured", jobFeatured);
    formData.append("is_featured", is_featured);
    formData.append("email_blasted", jobEmailBlasted);
    formData.append("post_price", totalPrice);
    formData.append("post_invoice_name", invoiceName);
    formData.append("post_invoice_address", invoiceAddress);
    formData.append("post_invoice_email", invoiceContact);
    formData.append("client_name", clientName);
    formData.append("client_contact", clientContact);
    formData.append("client_website", clientWebsite);

    if (
      jobType == undefined ||
      jobWorkspaceType == undefined ||
      jobPrimaryTag == undefined ||
      jobDescription == undefined ||
      jobDescription == "<p><br></p>"
    ) {
      toast.warn("Please fill correctly");
      return;
    }

    try {
      await axios
        .post("https://jobboard-api.herokuapp.com/api/jobs/", formData, {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (_) {
          toast.success("Posted your job");
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

  return (
    <>
      <Head>
        <title>Post New Job | Job Board</title>
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
        <div className="flex justify-between items-center mx-5 w-[360px] md:w-[550px] lg:w-[650px]">
          <div className="flex items-center">
            <h2 className="text-2xl text-[#FF6464] mr-7">Post New Job</h2>
          </div>
          <Link
            href="/client-dashboard"
            className="px-2.5 py-1.5 bg-[#009dffab] text-white font-bold text-lg rounded-lg"
          >
            Back to jobs
          </Link>
        </div>

        <form onSubmit={postJob}>
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
            required
          />
          <label className="text-gray-700 ml-5">Job Type</label>
          <div className="inline-block ml-3 w-56">
            <Select
              id="long-value-select"
              instanceId="long-value-select"
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
            required
          />
          <label htmlFor="jobsalary" className="text-gray-700 ml-5">
            Salary
          </label>
          <input
            id="jobsalary"
            type="text"
            className="block border border-grey-light w-[360px] mx-5 md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
            name="jobsalary"
            placeholder="USD 1,000 per month | range hour..."
            value={jobSalary}
            onChange={(e) => setjobSalary(e.target.value)}
          />
          <label htmlFor="applyurl" className="text-gray-700 ml-5">
            Apply Url
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
            required
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

          <div className="w-[360px] mx-5 md:w-[550px] lg:w-[650px] mt-10">
            <h2 className="text-gray-700 font-bold mb-1">
              Job post company details
            </h2>
            <label htmlFor="clientname" className="text-gray-700 ml-5">
              Upload optional image logo
            </label>
            <input
              id="imageInput"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              className="ml-5 block mt-1 mb-3"
            />

            <label htmlFor="clientname" className="text-gray-700 ml-5">
              Company Name
            </label>
            <input
              id="clientname"
              type="text"
              className="block border border-grey-light w-[360px] mx-5 md:w-[550px] lg:w-[650px] p-1.5 rounded mb-3"
              name="clientname"
              placeholder="visible in the job post"
              value={clientName}
              onChange={(e) => setclientName(e.target.value)}
              required
            />
            <label htmlFor="clientcontact" className="text-gray-700 ml-5">
              Company Contact
            </label>
            <input
              id="clientcontact"
              type="text"
              className="block border border-grey-light w-[360px] mx-5 md:w-[550px] lg:w-[650px] p-1.5 rounded mb-3"
              name="clientcontact"
              placeholder="email or phone visible..."
              value={clientContact}
              onChange={(e) => setclientContact(e.target.value)}
              required
            />
            <label htmlFor="clientwebsite" className="text-gray-700 ml-5">
              Company Website
            </label>
            <input
              id="clientwebsite"
              type="text"
              className="block border border-grey-light w-[360px] mx-5 md:w-[550px] lg:w-[650px] p-1.5 rounded mb-3"
              name="clientwebsite"
              placeholder="don't have,  use the apply url visible..."
              value={clientWebsite}
              onChange={(e) => setclientWebsite(e.target.value)}
              required
            />
          </div>

          <div className="w-[360px] mx-5 md:w-[550px] lg:w-[650px] mt-10">
            <h2 className="text-gray-700 font-bold mb-1">
              Invoice company details
            </h2>
            <label htmlFor="invoicename" className="text-gray-700 ml-5">
              Company Name
            </label>
            <input
              id="invoicename"
              type="text"
              className="block border border-grey-light w-[360px] mx-5 md:w-[550px] lg:w-[650px] p-1.5 rounded mb-3"
              name="invoicename"
              placeholder="Enter your name"
              value={invoiceName}
              onChange={(e) => setinvoiceName(e.target.value)}
              required
            />
            <label htmlFor="invoicecontact" className="text-gray-700 ml-5">
              Company Contact
            </label>
            <input
              id="invoicecontact"
              type="text"
              className="block border border-grey-light w-[360px] mx-5 md:w-[550px] lg:w-[650px] p-1.5 rounded mb-3"
              name="invoicecontact"
              placeholder="Enter your email or phone"
              value={invoiceContact}
              onChange={(e) => setinvoiceContact(e.target.value)}
              required
            />
            <label htmlFor="invoiceaddress" className="text-gray-700 ml-5">
              Company Address
            </label>
            <input
              id="invoiceaddress"
              type="address"
              className="block border border-grey-light w-[360px] mx-5 md:w-[550px] lg:w-[650px] p-1.5 rounded mb-3"
              name="invoiceaddress"
              placeholder="Enter your address"
              value={invoiceAddress}
              onChange={(e) => setinvoiceAddress(e.target.value)}
              required
            />
          </div>

          <div className="w-[360px] mx-5 md:w-[550px] lg:w-[650px] mt-10">
            <h2 className="text-gray-700 font-bold text-lg mb-1">
              Promote your job post
            </h2>

            <div className="flex items-center mb-4">
              <input
                id="emailblast"
                type="checkbox"
                className="w-4 h-4 text-blue-600 rounded"
                value={jobEmailBlasted}
                onChange={(e) => setjobEmailBlasted(!jobEmailBlasted)}
              />
              <label
                htmlFor="emailblast"
                className="ml-2 font-medium text-gray-900"
              >
                Send email to candidates for my job(+$
                {jobBlastPrice})
              </label>
            </div>

            <div className="flex items-center mb-2 w-[360px] md:w-[550px] lg:w-[650px]">
              <input
                id="24hour"
                type="radio"
                name="feature"
                className="w-4 h-4 text-blue-500"
                value="day"
                onChange={(e) => {
                  setjobFeatured(e.target.value);
                  setfeaturedPrice(jobDayFeaturePrice);
                }}
              />
              <label
                htmlFor="24hour"
                className="ml-2 font-medium text-gray-900"
              >
                Feature your post on the frontpage for 24 hours(+$
                {jobDayFeaturePrice})
              </label>
            </div>
            <div className="flex items-center mb-2 w-[360px] md:w-[550px] lg:w-[650px]">
              <input
                id="1week"
                type="radio"
                name="feature"
                className="w-4 h-4 text-blue-500"
                value="week"
                onChange={(e) => {
                  setjobFeatured(e.target.value);
                  setfeaturedPrice(jobWeekFeaturePrice);
                }}
              />
              <label htmlFor="1week" className="ml-2 font-medium text-gray-900">
                Feature your post on the frontpage for 1 week(+$
                {jobWeekFeaturePrice})
              </label>
            </div>
            <div className="flex items-center mb-2 w-[360px] md:w-[550px] lg:w-[650px]">
              <input
                id="1month"
                type="radio"
                name="feature"
                className="w-4 h-4 text-blue-500"
                value="month"
                onChange={(e) => {
                  setjobFeatured(e.target.value);
                  setfeaturedPrice(jobMonthFeaturePrice);
                }}
              />
              <label
                htmlFor="1month"
                className="ml-2 font-medium text-gray-900"
              >
                Feature your post on the frontpage for 1 month(+$
                {jobMonthFeaturePrice})
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-[360px] mx-5 md:w-[550px] lg:w-[650px] mt-3 px-10 py-1.5 rounded-md bg-[#57C4E5] text-white font-semibold text-lg flex items-center justify-center"
          >
            Post Job
            <span className="bg-red-400 w-10 h-1 inline-block mx-1"></span>$
            {totalPrice}
          </button>
        </form>

        <div></div>
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

  const clientData = await fetch(process.env.CLIENT_ACCOUNT_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  const clientID = clientData.id;

  return {
    props: {
      clientID,
      access,
    },
  };
}
