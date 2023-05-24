import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    try {
      await axios
        .post(process.env.TALENT_SUBSCRIBE_API, {
          email: email,
        })
        .then(function (response) {
          return res.status(response.status).json({
            message: response.data.message,
          });
        })
        .catch(function (error) {
          return res.status(400).json("Something went wrong!");
        });
    } catch (err) {
      console.log(`CATCH SERVER ${err}`);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} now allowed` });
  }
}
