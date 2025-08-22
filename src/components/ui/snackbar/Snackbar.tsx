import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { MdClose } from "react-icons/md";

interface SnackbarProps {
  message: string;
  variant?: "success" | "error" | "info";
  duration?: number; // Duration in milliseconds
  onClose?: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, variant = "info", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    if (duration !== 0) {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    } else {
        setVisible(true);
    }

  }, [duration, onClose]);

  return (
    <div
      className={clsx(
        "fixed z-40 bottom-4 px-4 py-2 d-flex justify-content-center justify-between",
        {
          "bg-green-500 text-white": variant === "success",
          "bg-danger text-white": variant === "error",
          "bg-blue-500 text-white": variant === "info",
          "opacity-0": !visible,
          "opacity-100": visible,
        }
      )}
    >
      <span>{message}</span>
    </div>
  );
};

export default Snackbar;
