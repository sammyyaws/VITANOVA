import React from "react";
import CardWrapper from "./CardWrapper";

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  borderColor?: "red" | "blue" | "green";
}

export default function StatCard({ title, value, subtext, borderColor = "blue" }: StatCardProps) {
  const borderClasses = {
    red: "border-l-4 border-l-primary",
    blue: "border-l-4 border-l-secondary",
    green: "border-l-4 border-l-green-500",
  };

  return (
    <CardWrapper className={`${borderClasses[borderColor]} flex flex-col gap-1.5 justify-center h-full`}>
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</span>
      <span className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</span>
      {subtext && <span className="text-xs text-gray-400 mt-0.5">{subtext}</span>}
    </CardWrapper>
  );
}
