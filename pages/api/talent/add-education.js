import axios from "axios";
import { parseCookies } from "../../../helpers";

export default async function handler(req, res) {
  const { access } = parseCookies(req);

  if (req.method === "POST") {
    const {
      clientID,
      educationSchool,
      educationField,
      educationLevel,
      educationStartDate,
      educationEndDate,
    } = req.body;

    try {
      await axios
        .post(
          process.env.TALENT_EDUCATIONS_API,
          {
            education_for: clientID,
            education_school: educationSchool,
            education_level: educationLevel,
            education_field: educationField,
            start_date: educationStartDate,
            end_date: educationEndDate,
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
