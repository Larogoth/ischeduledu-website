
import React from "react";

interface AppNameProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const AppName: React.FC<AppNameProps> = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-4xl", // Changed from text-3xl to text-4xl to match heading sizes
  };

  return (
    <span className={`font-euclid font-bold ${sizeClasses[size]} ${className}`}>
      iSchedulEDU
    </span>
  );
};

export default AppName;
