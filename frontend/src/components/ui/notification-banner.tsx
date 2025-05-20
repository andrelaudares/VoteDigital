
import React, { useState } from "react";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface NotificationBannerProps {
  title: string;
  message: string;
  type?: "info" | "success" | "warning" | "error";
  onClose?: () => void;
  className?: string;
  showIcon?: boolean;
  showCloseButton?: boolean;
}

const NotificationBanner = ({
  title,
  message,
  type = "info",
  onClose,
  className,
  showIcon = true,
  showCloseButton = true,
}: NotificationBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5" />;
      case "warning":
      case "error":
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 text-green-800 border-green-100 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
      case "warning":
        return "bg-yellow-50 text-yellow-800 border-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800";
      case "error":
        return "bg-red-50 text-red-800 border-red-100 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
      default:
        return "bg-blue-50 text-blue-800 border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-4 mb-4 animate-slide-in-right",
        getStyles(),
        className
      )}
    >
      <div className="flex items-start">
        {showIcon && <div className="mr-3 mt-0.5">{getIcon()}</div>}
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm mt-1 opacity-90">{message}</p>
        </div>
        {showCloseButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8 -mr-2 -mt-2"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default NotificationBanner;
