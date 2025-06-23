import { useQuery } from "@tanstack/react-query";
import { fetchAllPapers, fetchPaperBySubject } from "../services/conf";
import Card from "../Components/Card";
import { useEffect, useState } from "react";

type Paper = {
  id: string;
  subject: string;
  Year: string;
  Degree: string;
  University: string;
};

const PapersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // Debounce the search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch all papers
  const {
    data: papers,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useQuery({
    queryKey: ["papers"],
    queryFn: fetchAllPapers,
  });

  // Fetch search results only when debouncedTerm exists
  const {
    data: searchedPapers,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
  } = useQuery({
    queryKey: ["searchedPaper", debouncedTerm],
    queryFn: () => fetchPaperBySubject(debouncedTerm),
    enabled: !!debouncedTerm,
  });

  const isSearching = !!debouncedTerm;
  const loading = isLoadingAll || isLoadingSearch;

  const displayPapers = isSearching ? searchedPapers : papers;

  return (
    <div className="max-w-4xl mx-auto p-4 pt-30 pb-10 flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold mb-4">📚 All Generated Papers</h1>

      {/* Search input */}
      <div className="py-2 w-full">
        <label className="block mb-1 font-medium text-white">Search</label>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type subject"
          type="text"
          className="w-full px-4 py-2 bg-[#0f172a] text-[#f8fafc] border border-[#334155] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d9]"
        />

      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-6 text-[#cbd5e1] text-lg animate-pulse">
          ⏳ Loading papers...
        </div>
      )}

      {/* Error */}
      {(isErrorAll || isErrorSearch) && (
        <div className="text-red-400 mt-4">Error fetching papers.</div>
      )}

      {/* Results */}
      {!loading && displayPapers && (
        <>
          {displayPapers.length === 0 ? (
            <p className="text-gray-400 mt-4">No matching papers found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-4 w-full max-w-5xl z-10">
              {displayPapers.map((paper: Paper) => (
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
          )}
        </>
      )}
    </div>
  );
};

export default PapersList;
