import type { Job } from "@/types/jobTypes";
import JobItem from "./JobItem"; // pastikan ada komponen JobItem
import EmptyJob from "./EmptyJob";

interface JobListProps {
  jobs: Job[];
}

const JobList = ({ jobs }: JobListProps) => {
  return (
    <>
      {jobs.length > 0 ? (
        <div className="flex-1 flex flex-col items-center gap-4 w-full">
          <div className="flex flex-col gap-4 w-full">
            {jobs.map((job) => (
              <JobItem key={job.id} job={job} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyJob />
      )}
    </>
  );
};

export default JobList;
