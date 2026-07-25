import React from "react";

interface ActionButtonProps {
  label: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "dark" | "light-blue";
  onClick?: () => void;
  className?: string;
}

export default function ActionButton({ label, icon, variant = "primary", onClick, className = "" }: ActionButtonProps) {
  const styles = {
    primary: "bg-primary hover:bg-red-700 text-white shadow-md shadow-red-100",
    secondary: "border border-gray-200 text-gray-700 hover:bg-gray-50",
    dark: "bg-slate-900 hover:bg-slate-800 text-white",
    "light-blue": "bg-blue-50 hover:bg-blue-100/80 text-secondary border border-blue-100",
  };

  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto ${styles[variant]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
