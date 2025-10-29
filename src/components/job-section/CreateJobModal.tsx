import { useCreateJobForm } from "@/hooks/useCreateJobForm";
import { Button } from "../ui/button";
import CreateJobForm from "./CreateJobForm";
import { Modal } from "../Modal"; // pastikan path sesuai

interface CreateJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateJobModal = ({ open, onOpenChange }: CreateJobModalProps) => {
  const form = useCreateJobForm();

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Job Opening"
      footer={
        <Button
          onClick={() => {
            form.handleSubmit();
            onOpenChange(false);
          }}>
          Publish Job
        </Button>
      }>
      <div className="max-h-[600px] overflow-auto px-6 py-4">
        <CreateJobForm {...form} />
      </div>
    </Modal>
  );
};

export default CreateJobModal;
