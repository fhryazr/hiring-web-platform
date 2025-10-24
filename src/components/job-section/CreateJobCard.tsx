import { Button } from "../ui/button";
import CreateJobModal from "./CreateJobModal";

const CreateJobCard = () => {
  return (
    <div className="col-span-1 h-42 p-6 bg-[url('/create-job-card.png')] rounded-2xl bg-cover bg-no-repeat bg-center">
      <div className="mb-6">
        <p className="text-l-bold text-neutral-40">
          Recruite the best candidates
        </p>
        <p className="text-m-bold text-neutral-10">
          Create jobs, invite, and hire with ease
        </p>
      </div>
      <CreateJobModal>
        <Button
          variant={"default"}
          className="text-neutral-10! text-l-bold py-1.5 w-full">
          Create a new job
        </Button>
      </CreateJobModal>
    </div>
  );
};

export default CreateJobCard;
