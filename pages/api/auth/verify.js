import axios from "axios";
import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, otp } = req.body;

    try {
      await axios
        .post(process.env.VERIFY_API, {
          email: email,
          otp: otp,
        })
        .then(function (response) {
          res.setHeader("Set-Cookie", [
            cookie.serialize("access", response.data.data.access, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              maxAge: 60 * 60 * 24 * 29,
              sameSite: "strict",
              path: "/",
            }),
          ]);

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
