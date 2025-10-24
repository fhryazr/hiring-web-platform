import { Button } from "../ui/button";
import CreateJobModal from "./CreateJobModal";

const EmptyJob = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4">
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
};

export default EmptyJob;
