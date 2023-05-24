import Head from "next/head";
import Link from "next/link";

import { parseCookies } from "../../../helpers";
import ClientNavbar from "../../../components/ClientNavbar.js";

export default function ClientTalents({ talentProfiles, clientData }) {
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

      <main className="bg-[#f7f7f7] min-h-screen pt-6 pb-24">
        <div className="flex flex-wrap justify-center px-3 gap-5">
          {clientData.can_access_talents == false ? (
            <h1 className="text-gray-800">
              You don&apos;t have access to talents. Contact Us to use this
              feature
            </h1>
          ) : (
            talentProfiles.map((talent) => {
              return (
                <div
                  key={talent.id}
                  className="w-60 h-72 flex justify-center items-center bg-[#474747] border-[#363636] border-2 px-2 py-5 rounded-lg"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-[90px] h-[90px] bg-gray-200 grid place-items-center rounded-full">
                      <p className="text-4xl">{talent.talent_name[0]}</p>
                    </div>
                    <h3 className="text-gray-100 text-center font-bold capitalize text-lg mt-2">
                      {talent.talent_name}
                    </h3>
                    <h3 className="text-gray-200 text-center overflow-clip text-lg mt-2">
                      {talent.talent_title}
                    </h3>
                    <Link
                      href={`/client-dashboard/talents/${talent.id}`}
                      className="bg-[#00E7FF] px-3 py-1 rounded-sm text-gray-700 mt-3"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
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

  const talentProfiles = await fetch(process.env.GET_TALENTS_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  const clientData = await fetch(process.env.CLIENT_ACCOUNT_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(async (res) => await res.json());

  console.log(clientData);

  return {
    props: { talentProfiles, clientData },
  };
}
