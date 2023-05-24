import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, talent, client } = req.body;

    try {
      await axios
        .post(process.env.SIGNUP_API, {
          email: email,
          is_talent: talent,
          is_client: client,
        })
        .then(function (response) {
          return res.status(response.status).json({
            message: "User Created Successfully. Check Email.",
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
