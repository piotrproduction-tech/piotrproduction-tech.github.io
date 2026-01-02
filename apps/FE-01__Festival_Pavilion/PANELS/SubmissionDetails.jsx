import React, { useEffect, useState } from "react";
import { getSubmissionById } from "../festivalApi.js";

export default function SubmissionDetails({ submissionId }) {
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getSubmissionById(submissionId);
      setSubmission(data);
    })();
  }, [submissionId]);

  if (!submission) return <div>Ładowanie...</div>;

  return (
    <div>
      <h2>Szczegóły zgłoszenia</h2>
      <p>{submission.title}</p>
      <p>{submission.director}</p>
      <p>{submission.synopsis}</p>
      <a href="/festival">← Powrót</a>
    </div>
  );
}
