// src/pages/PapersList.tsx
import { useQuery } from "@tanstack/react-query";
import { fetchAllPapers } from "../services/conf";
import Card from "../Components/Card";
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
    <div className="max-w-4xl mx-auto p-4 pt-30 pb-10">
      <h1 className="text-2xl font-bold mb-4">📚 All Generated Papers</h1>
      <div className="grid grid-cols-2 md:grid-cols-2  gap-6 mt-4 w-full max-w-5xl z-10">
        {papers && papers.map((paper: Paper) => (
           <Card
           key={paper.id}
           id={paper.id}
           subject={paper.subject}
           Year={paper.Year}
           Degree={paper.Degree}
           University={paper.University}
         />
        ))}
      </div>
    </div>
  );
};

export default PapersList;
