import React from "react";

interface CardWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function CardWrapper({ children, className = "", id }: CardWrapperProps) {
  return (
    <div id={id} className={`bg-white border border-gray-100 rounded-2xl p-6 shadow-sm shadow-gray-100/30 ${className}`}>
      {children}
    </div>
  );
}
