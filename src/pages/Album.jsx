import React from "react";
import { Card } from "@/components/ui/card";

export default function Album() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Album View (Coming Soon)</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <div className="h-32 bg-cyan-700 rounded-lg" />
            <h2 className="mt-2 text-lg font-semibold">Album Track {i + 1}</h2>
          </Card>
        ))}
      </div>
    </div>
  );
}
