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
    <div className="max-w-4xl mx-auto p-4 pt-30">
      <h1 className="text-2xl mb-2 text-[#a78bfa] font-extrabold">
        📄 {paper.subject} (Year: {paper.Year})
      </h1>
      <p className="mb-1 text-[#a78bfa] font-bold">University: {paper.University}</p>
      <p className="mb-4 text-[#a78bfa] font-bold">Degree: {paper.Degree}</p>

      <h2 className="font-semibold mt-6 text-2xl text-[#a78bfa] mb-4">📝 Question Paper</h2>
      <div className="bg-[#1e293b]/60 border border-[#334155] rounded-2xl">
      <p className="p-4 py-8 rounded whitespace-pre-wrap text-white font-bold">{paper.generated_paper}</p>
      </div>
     

      <h2 className="font-semibold mt-6 text-2xl text-[#a78bfa] mb-4">📌 Summary</h2>
      <div className="bg-[#1e293b]/60 border border-[#334155] rounded-2xl">
      <p className=" p-3 py-8 rounded text-white font-bold">{paper.summary}</p></div>
      
    </div>
  );
};

export default PaperDetails;
