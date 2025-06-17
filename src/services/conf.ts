// src/services/papers.ts
import { supabase } from "../config/supabase-client";


export const generateAndStorePaper = async (formData: {
  subject: string;
  year: string;
  university: string;
  degree: string;
}) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User not authenticated");
  }

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const prompt = `
You are an expert AI exam paper generator.

Simulate that you've searched and reviewed the last 5 years of university question papers across top institutions for the following:

- Subject: ${formData.subject}
- Degree: ${formData.degree}
- Year: ${formData.year}
- University: ${formData.university}

Your task:

1. Analyze Past Papers (simulated):
   - Imagine you've studied question papers from the last 5 years for this course.
   - Identify questions that are repeated frequently and topics that appear regularly.
   - Focus on conceptually important areas and those most often asked by examiners.

2. Now Generate a Fresh Exam Paper:
   - Use your analysis to draft a new paper that feels authentic and balanced.
   - Structure it with the following sections:

     Section A – Short Answer Questions (6 to 10 questions)  
     Section B – Long Answer Questions (4 to 6 questions)  
     Section C – Frequently Asked Conceptual Questions (3 to 5 questions)  

   - Number each question plainly (e.g., 1, 2, 3...). Do not use any special formatting or markdown. Avoid asterisks, bold, or symbols.

3. After the paper, give a short summary:
   - Summarize the most commonly tested concepts and themes.
   - Write in clear, academic English as if advising a student what to focus on.

Important: Follow this strict output format:

[START_PAPER]  
<Insert the generated paper here in plain text>  
[END_PAPER]  

[START_SUMMARY]  
<Insert a 3 to 4 line academic summary of the most frequent and important topics, written like an exam tips guide>  
[END_SUMMARY]
`

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const answer = await res.json();
  const text = answer?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  const paper = text.match(/\[START_PAPER\]([\s\S]*?)\[END_PAPER\]/)?.[1]?.trim() || "No paper generated.";
  const summary = text.match(/\[START_SUMMARY\]([\s\S]*?)\[END_SUMMARY\]/)?.[1]?.trim() || "No summary available.";

  const { error } = await supabase.from("Papers").insert([
    {
      user_id: user.id,
      subject: formData.subject,
      Year: Number(formData.year),
      Degree: formData.degree,
      University: formData.university,
      generated_paper: paper,
      summary,
    },
  ]);

  if (error) throw new Error(error.message);

  return { generated_paper: paper, summary };
};



export const fetchAllPapers = async () => {
  const { data, error } = await supabase.from("Papers").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};



export const fetchPaperById = async (id: number) => {
  
  const { data, error } = await supabase.from("Papers").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
};

export const fetchPaperBySubject = async (subject: string) => {
  
  const { data, error } = await supabase.from("Papers").select("*").ilike("subject", `%${subject}%`)
  if (error) throw error;
  return data;
};
