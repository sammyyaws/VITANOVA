import React from "react";
import CardWrapper from "./CardWrapper";

interface BloodTypeCardProps {
  bloodType: string;
  units: number;
  statusText: string;
  isLowStock?: boolean;
}

export default function BloodTypeCard({ bloodType, units, statusText, isLowStock }: BloodTypeCardProps) {
  return (
    <CardWrapper className={`flex flex-col justify-between h-32 border transition-all hover:shadow-md ${isLowStock ? "bg-red-50/20 border-red-200" : "border-gray-100"}`}>
      <div className="flex justify-between items-start">
        <span className={`text-xl font-bold ${isLowStock ? "text-primary" : "text-red-500"}`}>{bloodType}</span>
      </div>
      <div className="flex flex-col gap-0.5 mt-2">
        <span className="text-3xl font-extrabold text-gray-900">{units}</span>
        <span className={`text-[10px] font-bold uppercase tracking-wider ${isLowStock ? "text-primary animate-pulse" : "text-gray-400"}`}>
          {statusText}
        </span>
      </div>
    </CardWrapper>
  );
}
