import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button {...props} className={`px-3 py-2 rounded-md bg-cyan-600 hover:bg-cyan-700 ${className}`}>
      {children}
    </button>
  );
}
