import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`px-3 py-2 rounded-lg bg-[#1b1b1b] border border-transparent focus:border-cyan-500 outline-none text-white w-full ${className}`}
    />
  );
}
