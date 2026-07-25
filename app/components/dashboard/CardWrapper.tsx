import React from "react";

interface CardWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function CardWrapper({ children, className = "" }: CardWrapperProps) {
  return (
    <div className={`bg-white border border-gray-100 rounded-2xl p-6 shadow-sm shadow-gray-100/30 ${className}`}>
      {children}
    </div>
  );
}
