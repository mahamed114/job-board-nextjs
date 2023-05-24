import axios from "axios";
import { parseCookies } from "../../../helpers";

export default async function handler(req, res) {
  const { access } = parseCookies(req);

  if (req.method === "PUT") {
    const {
      userID,
      talentName,
      talentTitle,
      talentBio,
      talentEmail,
      talentCountry,
    } = req.body;

    try {
      await axios
        .put(
          process.env.TALENT_PROFILE_API,
          {
            user: userID,
            talent_name: talentName,
            talent_title: talentTitle,
            talent_bio: talentBio,
            talent_email: talentEmail,
            talent_country: talentCountry,
          },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        )
        .then(function (response) {
          return res.status(response.status).json({
            message: response.data.message,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(`CATCH SERVER ${err}`);
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).json({ error: `Method ${req.method} now allowed` });
  }
}
