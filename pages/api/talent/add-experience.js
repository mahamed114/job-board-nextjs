import axios from "axios";
import { parseCookies } from "../../../helpers";

export default async function handler(req, res) {
  const { access } = parseCookies(req);

  if (req.method === "POST") {
    const {
      clientID,
      experienceTitle,
      experienceCompany,
      experienceDetails,
      experienceStartDate,
      experienceEndDate,
      experienceIsCurrent,
    } = req.body;

    try {
      await axios
        .post(
          process.env.TALENT_EXPERIENCES_API,
          {
            experience_for: clientID,
            experience_title: experienceTitle,
            experience_company: experienceCompany,
            experience_details: experienceDetails,
            start_date: experienceStartDate,
            end_date: experienceEndDate,
            currently_working: experienceIsCurrent,
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
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} now allowed` });
  }
}
