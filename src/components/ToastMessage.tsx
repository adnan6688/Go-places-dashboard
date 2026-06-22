import { toast } from "sonner";

type ToastType = "success" | "error";

export const ToastMessage = (type: ToastType, message: string) => {
  if (type === "success") {
    toast.success(message, {
      style: {
        background: "#DCFCE7",
        color: "#166534",
        border: "1px solid #86EFAC",
      },
    });
  }

  if (type === "error") {
    toast.error(message, {
      style: {
        background: "#FEE2E2",
        color: "#991B1B",
        border: "1px solid #FCA5A5",
      },
    });
  }
};