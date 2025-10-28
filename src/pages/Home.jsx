import React from "react";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Welcome to GodlikeMusic</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i}>
            <div className="h-32 bg-cyan-700 rounded-lg" />
            <h2 className="mt-2 text-lg font-semibold">Demo Song {i + 1}</h2>
          </Card>
        ))}
      </div>
    </div>
  );
}
