import React, { useState } from "react";
import { supabase } from "../api/supabase-client";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ExamForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    year: "",
    university: "",
    degree: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ generated_paper: string; summary: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const prompt = `
    You are an AI assistant for educators.
    
    Using the following information:
    - Subject: ${formData.subject}
    - Year: ${formData.year}
    - University: ${formData.university}
    - Degree: ${formData.degree}
    
    Generate:
    
    1. A **realistic, well-formatted question paper** for students. It should:
      - Contain 10 to 20 questions.
      - Look like a real university question paper.
      - Be divided into sections like "Section A – Short Answer Questions", "Section B – Long Answer Questions", etc. (You can adjust based on subject).
      - Avoid using any symbols like asterisks, bullets, or special characters. Use plain numbering (1, 2, 3...) and normal text formatting.
      - No explanations, only the questions.
    
    2. A **summary** describing the most frequently asked or important topics in simple, easy-to-understand language. The summary should:
      - Be no longer than 3-4 lines.
      - Use basic English.
      - Be student-friendly.
    
    Your final response must follow this exact format:
    
    [START_PAPER]
    <Insert full question paper here>
    [END_PAPER]
    
    [START_SUMMARY]
    <Insert simple summary here>
    [END_SUMMARY]
    `;
    
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );
    
      const answer = await res.json();
      const text = answer?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
      const paperMatch = text.match(/\[START_PAPER\]([\s\S]*?)\[END_PAPER\]/);
      const summaryMatch = text.match(/\[START_SUMMARY\]([\s\S]*?)\[END_SUMMARY\]/);
    
      const paper = paperMatch?.[1]?.trim() || "No paper generated.";
      const summary = summaryMatch?.[1]?.trim() || "No summary available.";
    
      setResult({ generated_paper: paper, summary });
    
      // Upload to Supabase (matching your table columns)
      const { data, error } = await supabase.from("Papers").insert([
        {
          subject: formData.subject,
          Year: Number(formData.year), // ✅ ensure it's numeric

          Degree: formData.degree,
          generated_paper: paper,
          summary: summary,
        },
      ]);
      
      if (error) {
        console.error("Supabase insert error:", error); // 👈 shows detailed error
      } else {
        console.log("Inserted successfully:", data);
      }
      
      setLoading(false)
    } catch (error) {
      console.error("Error calling Gemini or uploading:", error);
      setResult({
        generated_paper: "Error generating paper.",
        summary: "Error generating summary.",
      });
    }
    
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📄 ExamWhiz: Generate Question Paper</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="subject"
          placeholder="Subject"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="year"
          placeholder="Year"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="university"
          placeholder="University"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="degree"
          placeholder="Degree"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Generate & Submit"}
        </button>
      </form>

      {result && (
        <div className="mt-6 text-black">
          <h2 className="font-semibold text-lg mb-2">Generated Paper</h2>
          <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">{result.generated_paper}</pre>
          <h2 className="font-semibold text-lg mt-4 mb-2">Summary</h2>
          <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">{result.summary}</pre>
        </div>
      )}
    </div>
  );
};

export default ExamForm;
