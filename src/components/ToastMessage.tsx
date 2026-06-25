import { toast } from "sonner";

type ToastType = "success" | "error";

export const ToastMessage = (type: ToastType, message: string) => {
  const commonStyle = {
    borderRadius: "16px",
    padding: "16px",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.12)",
    backdropFilter: "blur(10px)",
  };

  if (type === "success") {
    toast.success(message, {
      style: {
        ...commonStyle,
        background: "rgba(34, 197, 94, 0.12)",
        color: "#166534",
        border: "1px solid rgba(34, 197, 94, 0.3)",
      },
    });
  }

  if (type === "error") {
    toast.error(message, {
      style: {
        ...commonStyle,
        background: "rgba(239, 68, 68, 0.12)",
        color: "#991B1B",
        border: "1px solid rgba(239, 68, 68, 0.3)",
      },
    });
  }
};