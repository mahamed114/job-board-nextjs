import axios from "axios";
import { parseCookies } from "../../../helpers";

export default async function handler(req, res) {
  const { access } = parseCookies(req);

  if (req.method === "PUT") {
    const {
      jobID,
      client,
      jobStatus,
      jobTitle,
      jobType,
      jobWorkspaceType,
      jobPrimaryTag,
      JobTags,
      jobLocations,
      jobSalary,
      jobApplyUrl,
      jobDescription,
      JobPostedAt,
    } = req.body;

    try {
      await axios
        .put(
          `${process.env.JOBS_API}${jobID}/`,
          {
            posted_by: client,
            job_title: jobTitle,
            job_description: jobDescription,
            job_apply_url: jobApplyUrl,
            job_primary_tag: jobPrimaryTag,
            job_status: jobStatus,
            job_tags: [JobTags],
            job_locations: [jobLocations],
            job_type: jobType,
            job_workspace_type: jobWorkspaceType,
            job_salary: jobSalary,
            job_posted_at: JobPostedAt,
          },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        )
        .then(function (response) {
          console.log(response);

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
