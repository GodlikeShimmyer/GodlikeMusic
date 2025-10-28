import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-[#181818] rounded-xl p-3 shadow-lg ${className}`}>
      {children}
    </div>
  );
}
