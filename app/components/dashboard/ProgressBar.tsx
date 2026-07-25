import React from "react";

interface ProgressBarProps {
  value: number; // 0 to 100
  color?: "red" | "blue" | "green";
  title?: string;
  showText?: boolean;
}

export default function ProgressBar({ value, color = "red", title = "Progress", showText = true }: ProgressBarProps) {
  const bgColors = {
    red: "bg-primary",
    blue: "bg-secondary",
    green: "bg-green-500",
  };

  return (
    <div className="w-full flex flex-col gap-1.5">
      {showText && (
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-gray-400">{title}</span>
          <span className={color === "red" ? "text-primary" : "text-gray-900"}>{value}%</span>
        </div>
      )}
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${bgColors[color]} transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}
