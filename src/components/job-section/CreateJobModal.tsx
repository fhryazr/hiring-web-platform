import { useCreateJobForm } from "@/hooks/useCreateJobForm";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import CreateJobForm from "./CreateJobForm";

const CreateJobModal = ({ children }: { children: React.ReactNode }) => {
  const form = useCreateJobForm();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader title="Job Opening" />

        <div className="h-156 px-6 py-4 overflow-auto">
          <CreateJobForm {...form} />
        </div>

        <DialogFooter>
          <Button onClick={form.handleSubmit}>Publish Job</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobModal;
