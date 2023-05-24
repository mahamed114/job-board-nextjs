import axios from "axios";
import { parseCookies } from "../../../helpers";

export default async function handler(req, res) {
  const { access } = parseCookies(req);

  if (req.method === "POST") {
    const {
      clientID,
      certificateName,
      certificateOrganization,
      certificateIssueDate,
      certificateExpirationDate,
    } = req.body;

    try {
      await axios
        .post(
          process.env.TALENT_CERTIFICATES_API,
          {
            certificate_for: clientID,
            certificate_name: certificateName,
            issuing_organization: certificateOrganization,
            issue_date: certificateIssueDate,
            expiration_date: certificateExpirationDate,
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
