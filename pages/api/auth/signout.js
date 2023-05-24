import { parseCookies } from "../../../helpers";
import axios from "axios";

export default async function handler(req, res) {
  const { access } = parseCookies(req);

  if (req.method === "GET") {
    await res.setHeader(
      "Set-Cookie",
      "access=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );

    try {
      await axios
        .get(process.env.LOGOUT_API, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        })
        .then(function (response) {
          return res.status(response.status).json({
            message: "User logged out successfully.",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(`CATCH SERVER ${err}`);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      error: `Method ${req.method} now allowed`,
    });
  }
}
