
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../config/supabase-client";
import Card from "../Components/Card";

const fetchUserPapers = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
  
    if (userError) throw new Error("Failed to get user");
  
    if (!user) throw new Error("User not authenticated"); // ✅ null check
  
    const { data, error } = await supabase
      .from("Papers")
      .select("*")
      .eq("user_id", user.id) // ✅ safe to access now
      .order("created_at", { ascending: false });
  
    if (error) throw new Error(error.message);
    return data;
  };
  

const UserDashboard = () => {
  const { data: papers, isLoading, isError } = useQuery({
    queryKey: ["userPapers"],
    queryFn: fetchUserPapers,
  });

  return (
    <div className="max-w-4xl mx-auto p-6 py-30">
      <h1 className="text-3xl font-bold mb-4">📚 Your Generated Papers</h1>

      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">Failed to load your papers.</p>}

      {papers?.length === 0 && <p>No papers generated yet.</p>}
      <div className="grid grid-cols-2 md:grid-cols-2  gap-6 mt-4 w-full max-w-5xl z-10">
      {papers?.map((paper) => (
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

export default UserDashboard;
