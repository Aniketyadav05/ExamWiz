import { useQuery } from "@tanstack/react-query";
import Card from "../Card";
import { fetchAllPapers } from "../../services/conf";
type Paper = {
  id: string;
  subject: string;
  Year: string;
  Degree: string;
  University: string;
};

const FeatureSection = () => {
    const { data: papers, isLoading, isError } = useQuery({
        queryKey: ["papers"],
        queryFn: fetchAllPapers,
      });
      
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching papers.</p>;
    
  return (
  
    <section className="bg-[#0b0f1a] flex flex-col items-center py-16 -mt-10 justify-center px-6 relative overflow-hidden">
      
      <section className="relative w-full bg-[#0b0f1a] py-20 px-6 flex flex-col items-center overflow-hidden">
  

  {/* Section Heading */}
  <div className="max-w-4xl text-center space-y-6 relative">
    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#facc15] via-[#a78bfa] to-[#7c3aed] drop-shadow">
      A Spark of Code, A Touch of Magic
    </h2>

    <p className="text-[#94a3b8] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
      Discover AI-generated past year papers crafted by modern spells. From university specifics to degree-based sorting, here's what ExamWhiz has summoned for you ✨
    </p>
  </div>
</section>


<div className="grid grid-cols-2 md:grid-cols-4  gap-6 mt-4 w-full max-w-5xl z-10">
{papers && papers.slice(0, 4).map((paper: Paper) => (
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
</section>
  )
}

export default FeatureSection