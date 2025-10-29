// import { Button } from "../ui/button";
import { useState } from "react";
import CreateJobModal from "./CreateJobModal";
import { Button } from "../ui/button";

const CreateJobCard = () => {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

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

      <Button
        className="text-md font-bold text-white hover:bg-primary-hover py-1.5 w-full"
        onClick={() => handleOpenModal()}>
        Create a new job
      </Button>
      <CreateJobModal open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default CreateJobCard;
