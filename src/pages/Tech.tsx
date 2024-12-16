// src/pages/Tech.tsx
import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Blog from "../components/Blog";

export default function Tech() {
  const { techName } = useParams<{ techName: string }>();

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6">
          {techName ? `Posts about ${techName}` : "Technology Posts"}
        </h1>
        <Blog category={techName} />
      </main>
    </div>
  );
}
