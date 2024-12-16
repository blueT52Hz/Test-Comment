// src/pages/Subject.tsx
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Blog from "../components/Blog";

export default function Subject() {
  const { subjectName } = useParams<{ subjectName: string }>();

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6">
          {subjectName ? `Posts about ${subjectName}` : "Programming Subjects"}
        </h1>
        <Blog category={subjectName} />
      </main>
    </div>
  );
}
