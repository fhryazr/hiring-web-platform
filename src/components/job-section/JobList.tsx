import { Button } from "@/components/ui/button";
import CreateJobModal from "./CreateJobModal";
import type { Job } from "@/types/jobTypes";
import JobItem from "./JobItem"; // pastikan ada komponen JobItem

interface JobListProps {
  jobs: Job[];
}

const JobList = ({ jobs }: JobListProps) => {
  const emptyJob = (
    <div className="flex flex-col items-center justify-center gap-4">
      <img src="/Empty State.png" alt="empty" />
      <div className="text-center">
        <p className="heading-s-bold">No jobs opening available</p>
        <p className="text-l-regular">
          Create a job opening and start a candidate process
        </p>
      </div>
      <CreateJobModal>
        <Button className="py-1.5 px-4 text-l-bold" variant={"secondary"}>
          Create a new job
        </Button>
      </CreateJobModal>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col items-center gap-4 w-full">
      {jobs.length > 0 ? (
        <div className="flex flex-col gap-4 w-full">
          {jobs.map((job) => (
            <JobItem key={job.id} job={job} />
          ))}
        </div>
      ) : (
        emptyJob
      )}
    </div>
  );
};

export default JobList;
