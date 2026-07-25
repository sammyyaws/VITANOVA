import React from "react";

interface NotificationItemProps {
  title: string;
  subtitle: string;
  actionText?: string;
  onActionClick?: () => void;
  icon?: React.ReactNode;
  borderLeftColor?: "blue" | "red" | "orange";
}

export default function NotificationItem({ title, subtitle, actionText, onActionClick, icon, borderLeftColor }: NotificationItemProps) {
  const borderClasses = borderLeftColor ? {
    blue: "border-l-4 border-l-secondary",
    red: "border-l-4 border-l-primary",
    orange: "border-l-4 border-l-orange-500",
  }[borderLeftColor] : "";

  return (
    <div className={`flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50/30 transition-colors w-full ${borderClasses}`}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-secondary flex-shrink-0">
            {icon}
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900 leading-snug">{title}</span>
          <span className="text-xs text-gray-400 mt-0.5">{subtitle}</span>
        </div>
      </div>
      {actionText && (
        <button 
          onClick={onActionClick}
          className="text-xs font-bold border border-secondary text-secondary hover:bg-secondary/5 px-4 py-2 rounded-lg transition-colors flex-shrink-0 ml-4 cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
