// src/pages/UserDashboard.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../config/supabase-client";
import { Link } from "react-router";

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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">📚 Your Generated Papers</h1>

      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">Failed to load your papers.</p>}

      {papers?.length === 0 && <p>No papers generated yet.</p>}

      {papers?.map((paper) => (
        <div
          key={paper.id}
          className="border rounded p-4 mb-4 bg-white shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold">{paper.subject} – {paper.year}</h2>
          <p className="text-sm text-gray-600 mb-2">{paper.university} • {paper.degree}</p>
          <p className="text-gray-700 line-clamp-3 mb-2">{paper.summary}</p>
          <Link
            to={`/papers/${paper.id}`}
            className="text-blue-600 hover:underline text-sm"
          >
            View Full Paper →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
