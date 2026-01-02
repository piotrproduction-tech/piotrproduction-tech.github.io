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
      <p><strong>Tytuł:</strong> {submission.title}</p>
      <p><strong>Reżyser:</strong> {submission.director}</p>
      <p><strong>Status:</strong> {submission.status}</p>
      <p><strong>Opis:</strong> {submission.synopsis}</p>
      <p><strong>Czas trwania:</strong> {submission.duration} min</p>
      <a href="/festival">← Powrót</a>
    </div>
  );
}
