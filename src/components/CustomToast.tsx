/* eslint-disable react-refresh/only-export-components */
import { CheckCircle2, CircleAlert, CircleX, X } from "lucide-react";
import { toast as sonnerToast } from "sonner";

interface ToastProps {
  id: string | number;
  message: string;
  type: "success" | "warning" | "error";
}

// Komponen toast custom
function Toast({ message, id, type }: ToastProps) {
  let accentColor;

  switch (type) {
    case "error":
      accentColor = "bg-danger-main text-danger-main";
      break;
    case "warning":
      accentColor = "bg-secondary-main text-secondary-main";
      break;
    default:
      accentColor = "bg-primary-main text-primary-main";
      break;
  }
  return (
    <div className={`${accentColor} shadow-xl rounded-lg pl-2`}>
      <div className="flex px-4 py-6 gap-2 rounded-lg bg-neutral-10 items-center justify-between">
        {type == "success" && <CheckCircle2 />}
        {type == "warning" && <CircleAlert />}
        {type == "error" && <CircleX />}
        <p className="text-sm mr-4 font-medium text-gray-900">{message}</p>
        <button onClick={() => sonnerToast.dismiss(id)}>
          <X className="text-black" />
        </button>
      </div>
    </div>
  );
}

// Fungsi helper agar lebih mudah dipanggil
export function showCustomToast(toastProps: Omit<ToastProps, "id">) {
  return sonnerToast.custom((id) => (
    <Toast id={id} message={toastProps.message} type={toastProps.type} />
  ));
}
