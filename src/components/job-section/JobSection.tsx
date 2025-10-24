import { useJobStore } from "@/store/jobStore";
import SearchBar from "../SearchBar";
import JobList from "./JobList";

const JobSection = () => {
  const { jobs } = useJobStore();

  return (
    <div className="col-span-4 flex flex-col h-full gap-4">
      <SearchBar />
      <JobList jobs={jobs} />
    </div>
  );
};

export default JobSection;
