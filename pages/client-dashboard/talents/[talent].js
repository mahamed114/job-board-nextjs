import Head from "next/head";
import Link from "next/link";

import { parseCookies } from "../../../helpers";
import ClientNavbar from "../../../components/ClientNavbar.js";

export default function TalentDetails({
  talentProfile,
  talentExperiences,
  talentEducations,
  talentCertificates,
  clientData,
}) {
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

      <main className="bg-[#f7f7f7] min-h-screen pt-3 pb-24">
        {clientData.can_access_talents == false ? (
          <h1 className="text-gray-800 grid place-items-center">
            You don&apos;t have access to talents. Contact Us to use this
            feature
          </h1>
        ) : (
          <div className="bg-[#dfdfdf] border-[#cccccc] border-2 p-3 rounded-lg mx-auto w-[380px] md:w-[550px] lg:w-[550px] mb-5">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-black font-bold text-lg capitalize">
                {talentProfile[0].talent_name}
              </h2>
              <Link
                href="/client-dashboard"
                className="text-red-600 text-lg rounded-lg"
              >
                Back to jobs
              </Link>
            </div>
            <h2 className="text-gray-900 capitalize mb-1">
              {talentProfile[0].talent_title}
            </h2>
            <h2 className="text-gray-900 mb-1">
              <span className="text-black">Email: </span>
              {talentProfile[0].talent_email}
            </h2>
            <h2 className="text-gray-900 mb-3">
              <span className="text-black">Country: </span>
              {talentProfile[0].talent_country}
            </h2>
            <h3 className="text-gray-800 font-bold text-lg mb-1">Talent Bio</h3>
            <p className="text-gray-900 mb-1">{talentProfile[0].talent_bio}</p>
            <br />
            <h3 className="text-gray-900 font-bold text-lg mb-1">
              Experiences
            </h3>
            {talentExperiences != null ? (
              talentExperiences.map((exp) => {
                return (
                  <div
                    key={exp.id}
                    className="bg-slate-800 mx-auto rounded-md px-3 py-2 mb-2 w-[360px] md:w-[500px] lg:w-[500px]"
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
              })
            ) : (
              <p className="text-red-600 mb-1">No Experience Added</p>
            )}
            <br />
            <h3 className="text-gray-900 font-bold text-lg mb-1">Educations</h3>
            {talentEducations != null ? (
              talentEducations.map((edu) => {
                return (
                  <div
                    key={edu.id}
                    className="bg-slate-800 mx-auto rounded-md px-3 py-2 mb-2 w-[360px] md:w-[500px] lg:w-[500px]"
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
                      <h2 className="capitalize text-gray-200">
                        {edu.end_date}
                      </h2>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-red-600 mb-1">No Education Added</p>
            )}
            <br />
            <h3 className="text-gray-900 font-bold text-lg mb-1">
              Certificates
            </h3>
            {talentCertificates != null ? (
              talentCertificates.map((cert) => {
                return (
                  <div
                    key={cert.id}
                    className="bg-slate-800 mx-auto rounded-md px-3 py-2 mb-2 w-[360px] md:w-[500px] lg:w-[500px]"
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
              })
            ) : (
              <p className="text-red-600 mb-1">No Certificate Added</p>
            )}
          </div>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps({ req, params }) {
  const talent = params.talent;
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

  const talentProfile = await fetch(
    `${process.env.GET_TALENTS_API}${talent}/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }
  ).then(async (res) => await res.json());

  const talentExperiences = await fetch(
    `${process.env.GET_TALENT_EXPERIENCES_API}${talent}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }
  ).then(async (res) => await res.json());

  const talentEducations = await fetch(
    `${process.env.GET_TALENT_EDUCATIONs_API}${talent}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }
  ).then(async (res) => await res.json());

  const talentCertificates = await fetch(
    `${process.env.GET_TALENT_CERTIFICATES_API}${talent}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }
  ).then(async (res) => await res.json());
  const clientData = await fetch(process.env.CLIENT_ACCOUNT_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  console.log(clientData);

  return {
    props: {
      talentProfile,
      talentExperiences,
      talentEducations,
      talentCertificates,
      clientData,
    },
  };
}
