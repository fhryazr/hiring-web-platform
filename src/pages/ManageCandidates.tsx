import { DataTable } from "@/components/candidate-management/DataTable";
import { generateCandidateColumns } from "@/components/candidate-management/generateColumns";
import NoCandidate from "@/components/candidate-management/NoCandidate";
import Navbar from "@/components/Navbar";
import { useJobStore } from "@/store/jobStore";
import { useJobWithCandidateStore } from "@/store/jobWithCandidateStore";
import type { Candidate } from "@/types/candidateTypes";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ManagementCandidates() {
  const { jobId } = useParams<{ jobId: string }>();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [columns, setColumns] = useState<ColumnDef<Candidate, unknown>[]>([]);
  const [jobName, setJobName] = useState<string>("");

  const { getJobCandidateById } = useJobWithCandidateStore();
  const { getJobById } = useJobStore();

  useEffect(() => {
    if (jobId) {
      const dataCandidate = getJobCandidateById(jobId);
      const dataJob = getJobById(jobId);

      if (dataJob) {
        setJobName(dataJob.title);
      }

      if (dataCandidate) {
        setCandidates(dataCandidate.candidates);
        const generatedColumns = generateCandidateColumns(
          dataCandidate.candidates
        );
        setColumns(generatedColumns);
      } else {
        setCandidates([]);
        setColumns([]);
      }
    }
  }, [getJobById, getJobCandidateById, jobId]);

  return (
    <section className="h-dvh flex flex-col">
      <Navbar />
      <div className="flex flex-col flex-1 p-6">
        <h1 className="text-lg font-semibold mb-4">{jobName}</h1>
        {columns.length > 0 && candidates.length > 0 ? (
          <DataTable columns={columns} data={candidates} />
        ) : (
          <NoCandidate />
        )}
      </div>
    </section>
  );
}
