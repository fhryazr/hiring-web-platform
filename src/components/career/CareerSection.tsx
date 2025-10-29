import { useJobStore } from "@/store/jobStore";
import CareerList from "./CareerList";
import CareerDetail from "./CareerDetail";

const CareerSection = () => {
  const { jobs, selectedJob } = useJobStore();

  const activeJob = jobs.filter((job) => job.status == "active");

  return (
    <div className="container overflow-hidden mx-auto grid grid-cols-4 gap-6 pt-9 pb-6 pl-6 pr-4">
      <CareerList jobs={activeJob} />
      <CareerDetail id={selectedJob} />
    </div>
  );
};

export default CareerSection;
