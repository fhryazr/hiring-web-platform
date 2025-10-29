import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  // DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  open: boolean;
  title: string;
  // trigger: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
  onOpenChange: (open: boolean) => void;
}

export const Modal = ({
  open = false,
  title,
  // trigger,
  children,
  footer,
  onOpenChange,
}: ModalProps) => {
  // const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger asChild>{trigger}</DialogTrigger> */}

      <DialogContent>
        <DialogHeader title={title} />

        <DialogDescription />

        <>{children}</>

        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
