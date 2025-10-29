import type { Job } from "@/types/jobTypes";
import { CareerItem } from "./CareerItem";
import { useJobStore } from "@/store/jobStore";

interface CareerListProps {
  jobs: Job[];
}

const CareerList = ({ jobs }: CareerListProps) => {
  const { selectedJob } = useJobStore();

  return (
    <div className="col-span-1 overflow-auto px-2">
      <div className="flex flex-col items-center gap-4 w-full">
        {jobs.map((job) => (
          <CareerItem
            key={job.id}
            job={job}
            isSelected={selectedJob === job.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CareerList;
