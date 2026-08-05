import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose?: () => void;
};

export default function Toast({ message, type, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`
        fixed top-4 right-4 min-w-[260px] p-4 rounded-lg shadow-lg
        ${type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}
        transition-transform transform-gpu
        ${visible ? "translate-y-0" : "-translate-y-12"}
      `}
      role="alert"
      onClick={() => {
        setVisible(false);
        if (onClose) onClose();
      }}
    >
      {message}
    </div>
  );
}
