// src/pages/PaperDetails.tsx
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchPaperById } from "../services/conf";

const PaperDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data: paper, isLoading, isError } = useQuery({
    queryKey: ["paper", id],
    queryFn: () => fetchPaperById(Number(id)),
  });

  if (isLoading) return <p>Loading paper...</p>;
  if (isError || !paper) return <p>Error loading paper.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">
        📄 {paper.subject} ({paper.Year})
      </h1>
      <p className="mb-1 text-gray-700">University: {paper.University}</p>
      <p className="mb-4 text-gray-700">Degree: {paper.Degree}</p>

      <h2 className="font-semibold mt-6 mb-2">📝 Question Paper</h2>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-black">{paper.generated_paper}</pre>

      <h2 className="font-semibold mt-6 mb-2">📌 Summary</h2>
      <p className="bg-gray-100 p-3 rounded text-black">{paper.summary}</p>
    </div>
  );
};

export default PaperDetails;
