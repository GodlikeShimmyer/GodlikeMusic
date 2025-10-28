import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition text-white font-semibold ${className}`}
    >
      {children}
    </button>
  );
}
