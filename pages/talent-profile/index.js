import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { parseCookies } from "../../helpers";
import TalentNavbar from "../../components/TalentNavbar.js";

export default function TalentProfile({
  talentProfile,
  talentEducations,
  talentExperiences,
  talentCertificates,
}) {
  const userID = talentProfile.user;
  const clientID = talentProfile.id;

  const [talentName, settalentName] = useState(talentProfile.talent_name);
  const [talentTitle, settalentTitle] = useState(talentProfile.talent_title);
  const [talentBio, settalentBio] = useState(talentProfile.talent_bio);
  const [talentEmail, settalentEmail] = useState(talentProfile.talent_email);
  const [talentCountry, settalentCountry] = useState(
    talentProfile.talent_country
  );
  const [experienceTitle, setexperienceTitle] = useState();
  const [experienceCompany, setexperienceCompany] = useState();
  const [experienceDetails, setexperienceDetails] = useState();
  const [experienceStartDate, setexperienceStartDate] = useState();
  const [experienceEndDate, setexperienceEndDate] = useState();
  const [experienceIsCurrent, setexperienceIsCurrent] = useState(false);

  const [educationSchool, seteducationSchool] = useState();
  const [educationField, seteducationField] = useState();
  const [educationLevel, seteducationLevel] = useState();
  const [educationStartDate, seteducationStartDate] = useState();
  const [educationEndDate, seteducationEndDate] = useState();

  const [certificateName, setcertificateName] = useState();
  const [certificateOrganization, setcertificateOrganization] = useState();
  const [certificateIssueDate, setcertificateIssueDate] = useState();
  const [certificateExpirationDate, setcertificateExpirationDate] = useState();

  const [showAddEducationForm, setshowAddEducationForm] = useState(false);
  const [showAddExperienceForm, setshowAddExperienceForm] = useState(false);
  const [showAddCertificateForm, setshowAddCertificateForm] = useState(false);

  const handleSignOut = async () => {
    try {
      await axios.get("/api/auth/signout", {});

      router.push("/");
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      await axios
        .put("/api/talent/profile", {
          userID,
          talentName,
          talentTitle,
          talentBio,
          talentEmail,
          talentCountry,
        })
        .then(function () {
          toast.success("Profile updated");
        })
        .catch(function () {
          toast.warn("Something went wrong");
        });
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

  const addExperience = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("/api/talent/add-experience", {
          clientID,
          experienceTitle,
          experienceCompany,
          experienceDetails,
          experienceStartDate,
          experienceEndDate,
          experienceIsCurrent,
        })
        .then(function () {
          toast.success("Experience added");
          setshowAddExperienceForm(false);
        })
        .catch(function () {
          toast.success("Something went wrong");
        });
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

  const addEducation = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("/api/talent/add-education", {
          clientID,
          educationSchool,
          educationField,
          educationLevel,
          educationStartDate,
          educationEndDate,
        })
        .then(function () {
          toast.success("Education added");
          setshowAddEducationForm(false);
        })
        .catch(function () {
          toast.success("Something went wrong");
        });
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

  const addCertificate = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("/api/talent/add-certificate", {
          clientID,
          certificateName,
          certificateOrganization,
          certificateIssueDate,
          certificateExpirationDate,
        })
        .then(function () {
          toast.success("Certification added");
          setshowAddCertificateForm(false);
        })
        .catch(function () {
          toast.success("Something went wrong");
        });
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

  return (
    <>
      <Head>
        <title>Profile | Job Board</title>
        <meta
          name="description"
          content="Job Board help you find your dream job or hire create talent."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TalentNavbar logoutHandler={handleSignOut} />
      <ToastContainer />

      <main className="bg-[#f7f7f7] min-h-screen pt-6 pb-24 sm:pl-4 md:pl-12 lg:pl-20">
        <h2 className="ml-5 w-[380px] md:w-[550px] lg:w-[650px] text-2xl text-[#FF6464]">
          Your Profile
        </h2>
        <br />
        <form onSubmit={updateProfile}>
          <label htmlFor="name" className="text-gray-700 ml-5">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
            name="name"
            placeholder="Enter your full"
            value={talentName}
            onChange={(e) => settalentName(e.target.value)}
            required
          />
          <label htmlFor="title" className="text-gray-700 ml-5">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
            name="title"
            placeholder="Enter your title tagline"
            value={talentTitle}
            onChange={(e) => settalentTitle(e.target.value)}
            required
          />
          <label htmlFor="bio" className="text-gray-700 ml-5">
            Your Bio
          </label>
          <textarea
            rows=""
            cols=""
            id="bio"
            className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
            placeholder="Describe about your self"
            value={talentBio}
            onChange={(e) => settalentBio(e.target.value)}
            required
          ></textarea>
          <label htmlFor="email" className="text-gray-700 ml-5">
            Contact Email
          </label>
          <input
            id="email"
            type="text"
            className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
            name="email"
            placeholder="visible for clients"
            value={talentEmail}
            onChange={(e) => settalentEmail(e.target.value)}
            required
          />
          <label htmlFor="country" className="text-gray-700 ml-5">
            Country
          </label>
          <input
            id="country"
            type="text"
            className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
            name="country"
            placeholder="Enter your current country"
            value={talentCountry}
            onChange={(e) => settalentCountry(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-[360px] mx-5 md:w-[550px] lg:w-[650px] mt-3 px-10 py-1.5 rounded-md bg-[#57C4E5] text-white font-semibold text-lg"
          >
            Update
          </button>
        </form>

        <div className="mt-10">
          <div className="flex justify-between items-center mx-5 w-[360px] md:w-[550px] lg:w-[650px]">
            <h2 className="text-2xl text-[#FF6464]">Experiences</h2>
            <button
              onClick={() => setshowAddExperienceForm(true)}
              className="bg-slate-800 text-gray-100 px-2 py-1 rounded-sm"
            >
              Add Experience
            </button>
          </div>
          <br />
          {showAddExperienceForm ? (
            <form onSubmit={addExperience}>
              <label htmlFor="exptitle" className="text-gray-700 ml-5">
                Experience Title
              </label>
              <input
                id="exptitle"
                type="text"
                className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
                placeholder="Enter your position title"
                value={experienceTitle}
                onChange={(e) => setexperienceTitle(e.target.value)}
                required
              />
              <label htmlFor="expcompany" className="text-gray-700 ml-5">
                Experience Company
              </label>
              <input
                id="expcompany"
                type="text"
                className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
                placeholder="Enter the company name"
                value={experienceCompany}
                onChange={(e) => setexperienceCompany(e.target.value)}
                required
              />
              <label htmlFor="bio" className="text-gray-700 ml-5">
                About Experience
              </label>
              <textarea
                rows=""
                cols=""
                id="bio"
                className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
                placeholder="Describe more about your experience"
                value={experienceDetails}
                onChange={(e) => setexperienceDetails(e.target.value)}
              ></textarea>
              <label htmlFor="expstartdate" className="text-gray-700 ml-5">
                Start Date
              </label>
              <p className="ml-5 text-gray-600">
                Enter full month name followed by full year
              </p>
              <input
                id="expstartdate"
                type="text"
                className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
                placeholder="Ex: January 2020"
                value={experienceStartDate}
                onChange={(e) => setexperienceStartDate(e.target.value)}
                required
              />
              <label htmlFor="expenddate" className="text-gray-700 ml-5">
                End Date
              </label>
              <p className="ml-5 text-gray-600">
                Enter full month name followed by full year
              </p>
              <input
                id="expenddate"
                type="text"
                className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
                placeholder="Ex: December 2022"
                value={experienceEndDate}
                onChange={(e) => setexperienceEndDate(e.target.value)}
                required
              />
              <div className="flex items-center mb-1 mx-5 w-[360px] md:w-[550px] lg:w-[650px]">
                <input
                  id="currently"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded"
                  value={experienceIsCurrent}
                  onChange={() => setexperienceIsCurrent(!experienceIsCurrent)}
                />
                <label
                  htmlFor="currently"
                  className="ml-2 text-lg font-medium text-gray-900"
                >
                  I work currently
                </label>
              </div>
              <button
                type="submit"
                className="w-[360px] mx-5 md:w-[550px] lg:w-[650px] mt-3 px-10 py-1.5 rounded-md bg-[#57C4E5] text-white font-semibold text-lg"
              >
                Add Experience
              </button>
            </form>
          ) : (
            <div></div>
          )}
          <br />
          {talentExperiences.map((exp) => {
            return (
              <div
                key={exp.id}
                className="bg-slate-800  rounded-md px-3 py-2 mb-2 mx-5 w-[360px] md:w-[550px] lg:w-[650px]"
              >
                <h2 className="capitalize text-lg font-semibold text-white mb-3">
                  {exp.experience_title}
                </h2>
                <h2 className="capitalize text-gray-200">
                  {exp.experience_company}
                </h2>
                <h2 className="capitalize text-gray-200">
                  {exp.experience_details}
                </h2>
                <div className="flex flex-wrap">
                  <h2 className="capitalize text-gray-200 mr-3">
                    {exp.start_date}
                  </h2>
                  <h2 className="capitalize text-gray-200">
                    {exp.currently_working ? "Currently" : exp.end_date}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <div className="flex justify-between items-center mx-5 w-[360px] md:w-[550px] lg:w-[650px]">
            <h2 className="text-2xl text-[#FF6464]">Educations</h2>
            <button
              onClick={() => setshowAddEducationForm(true)}
              className="bg-slate-700 text-gray-100 px-2 py-1 rounded-sm"
            >
              Add Education
            </button>
          </div>
          <br />
          {showAddEducationForm ? (
            <form onSubmit={addEducation}>
              <label htmlFor="eduschool" className="text-gray-700 ml-5">
                Education School
              </label>
              <input
                id="eduschool"
                type="text"
                className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
                placeholder="Enter name of the university, college..."
                value={educationSchool}
                onChange={(e) => seteducationSchool(e.target.value)}
                required
              />
              <label htmlFor="edufield" className="text-gray-700 ml-5">
                Education Field
              </label>
              <input
                id="edufield"
                type="text"
                className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
                placeholder="Enter your field"
                value={educationField}
                onChange={(e) => seteducationField(e.target.value)}
                required
              />
              <label htmlFor="edulevel" className="text-gray-700 ml-5">
                Education Level
              </label>
              <input
                id="edulevel"
                type="text"
                className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
                placeholder="Ex: Diploma, Degree..."
                value={educationLevel}
                onChange={(e) => seteducationLevel(e.target.value)}
                required
              />
              <label htmlFor="edustart" className="text-gray-700 ml-5">
                Start Date
              </label>
              <p className="ml-5 text-gray-600">
                Enter full month name followed by full year
              </p>
              <input
                id="edustart"
                type="text"
                className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
                placeholder="Ex: January 2020"
                value={educationStartDate}
                onChange={(e) => seteducationStartDate(e.target.value)}
                required
              />
              <label htmlFor="eduend" className="text-gray-700 ml-5">
                End Date
              </label>
              <p className="ml-5 text-gray-600">
                Enter full month name followed by full year
              </p>
              <input
                id="eduend"
                type="text"
                className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
                placeholder="Ex: December 2022"
                value={educationEndDate}
                onChange={(e) => seteducationEndDate(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-[360px] mx-5 md:w-[550px] lg:w-[650px] mt-3 px-10 py-1.5 rounded-md bg-[#57C4E5] text-white font-semibold text-lg"
              >
                Add Education
              </button>
            </form>
          ) : (
            <div></div>
          )}
          <br />
          {talentEducations.map((edu) => {
            return (
              <div
                key={edu.id}
                className="bg-slate-700  rounded-md px-3 py-2 mb-2 mx-5 w-[360px] md:w-[550px] lg:w-[650px]"
              >
                <h2 className="capitalize text-lg font-semibold text-white mb-3">
                  {edu.education_school}
                </h2>
                <h2 className="capitalize text-gray-200">
                  {edu.education_level}
                </h2>
                <h2 className="capitalize text-gray-200">
                  {edu.education_field}
                </h2>
                <div className="flex flex-wrap">
                  <h2 className="capitalize text-gray-200 mr-3">
                    {edu.start_date}
                  </h2>
                  <h2 className="capitalize text-gray-200">{edu.end_date}</h2>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10">
          <div className="flex justify-between items-center mx-5 w-[360px] md:w-[550px] lg:w-[650px]">
            <h2 className="text-2xl text-[#FF6464]">Certificates</h2>
            <button
              onClick={() => setshowAddCertificateForm(true)}
              className="bg-slate-600 text-gray-100 px-2 py-1 rounded-sm"
            >
              Add Certificate
            </button>
          </div>
          <br />
          {showAddCertificateForm ? (
            <form onSubmit={addCertificate}>
              <label htmlFor="certname" className="text-gray-700 ml-5">
                Certificate Name
              </label>
              <input
                id="certname"
                type="text"
                className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
                placeholder="Enter certificate name"
                value={certificateName}
                onChange={(e) => setcertificateName(e.target.value)}
                required
              />
              <label htmlFor="certorg" className="text-gray-700 ml-5">
                Certificate Issuing Organization
              </label>
              <input
                id="certorg"
                type="text"
                className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
                placeholder="Enter name of the organization"
                value={certificateOrganization}
                onChange={(e) => setcertificateOrganization(e.target.value)}
                required
              />
              <label htmlFor="certissue" className="text-gray-700 ml-5">
                Issue Date
              </label>
              <p className="ml-5 text-gray-600">
                Enter full month name followed by full year
              </p>
              <input
                id="certissue"
                type="text"
                className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
                placeholder="Ex: January 2020"
                value={certificateIssueDate}
                onChange={(e) => setcertificateIssueDate(e.target.value)}
                required
              />
              <label htmlFor="certexp" className="text-gray-700 ml-5">
                Expiration Date
              </label>
              <p className="ml-5 text-gray-600">
                Enter full month name followed by full year
              </p>
              <input
                id="certexp"
                type="text"
                className="block border border-grey-light mx-5 w-[360px] md:w-[550px] lg:w-[650px] p-1.5 rounded mb-4"
                placeholder="Ex: December 2022"
                value={certificateExpirationDate}
                onChange={(e) => setcertificateExpirationDate(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-[360px] mx-5 md:w-[550px] lg:w-[650px] mt-3 px-10 py-1.5 rounded-md bg-[#57C4E5] text-white font-semibold text-lg"
              >
                Add Certificate
              </button>
            </form>
          ) : (
            <div></div>
          )}
          <br />
          {talentCertificates.map((cert) => {
            return (
              <div
                key={cert.id}
                className="bg-slate-600  rounded-md px-3 py-2 mb-2 mx-5 w-[360px] md:w-[550px] lg:w-[650px]"
              >
                <h2 className="capitalize text-lg font-semibold text-white mb-3">
                  {cert.certificate_name}
                </h2>
                <h2 className="capitalize text-gray-200">
                  {cert.issuing_organization}
                </h2>
                <div className="flex flex-wrap">
                  <h2 className="capitalize text-gray-200 mr-3">
                    {cert.issue_date}
                  </h2>
                  <h2 className="capitalize text-gray-200">
                    {cert.expiration_date}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mb-12 "></div>
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

  if (userType.talent == false) {
    return {
      redirect: {
        destination: "/client-dashboard",
        permanent: false,
      },
    };
  }

  const talentProfile = await fetch(process.env.TALENT_PROFILE_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  const talentEducations = await fetch(process.env.TALENT_EDUCATIONS_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  const talentExperiences = await fetch(process.env.TALENT_EXPERIENCES_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  const talentCertificates = await fetch(process.env.TALENT_CERTIFICATES_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  return {
    props: {
      talentProfile,
      talentEducations,
      talentExperiences,
      talentCertificates,
    },
  };
}
