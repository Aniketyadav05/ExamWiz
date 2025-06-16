// src/pages/PapersList.tsx
import { useQuery } from "@tanstack/react-query";
import { fetchAllPapers } from "../services/conf";
import { Link } from "react-router";
type Paper = {
  id: string;
  subject: string;
  Year: string;
  Degree: string;
  University: string;
};
const PapersList = () => {
  const { data: papers, isLoading, isError } = useQuery({
    queryKey: ["papers"],
    queryFn: fetchAllPapers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching papers.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📚 All Generated Papers</h1>
      <ul className="space-y-4">
        {papers && papers.slice(0, 4).map((paper: Paper) => (
          <li key={paper.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold text-lg text-white">{paper.subject} ({paper.Year})</h2>
            <p>{paper.Degree}</p>
            <p>{paper.University}</p>
            <Link
              to={`/papers/${paper.id}`}
              className="text-blue-600 hover:underline"
            >
              View Details →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PapersList;
