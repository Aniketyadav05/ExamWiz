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

Simulate that you've searched and reviewed the last **5 years of university question papers** across major institutions in the subject:

- Subject: ${formData.subject}
- Degree: ${formData.degree}
- Year: ${formData.year}
- University: ${formData.university}

Your task:

### 🔍 Analyze Past Papers (simulated behavior):
- Imagine you accessed the last 5 years of question papers.
- Identify **frequently repeated questions** and **important topics**.
- Prioritize **questions that are most commonly asked** or **conceptually important**.

---

### 📝 Now Generate a New Paper:
- Use insights from the past 5 years.
- Structure it like a real university exam paper.
- Include:
  - Section A – Short Answer Questions (6–10)
  - Section B – Long Answer Questions (4–6)
  - Section C – Frequently Asked Conceptual Questions (3–5)
- Use plain formatting (e.g., 1, 2, 3...) and no markdown.

---

### 📌 Summary (3–4 lines only):
At the end, summarize the most important frequently asked concepts in simple English.

---

### 🎯 Output Format (strict):
Respond in this **exact structure**:

[START_PAPER]
<Put the generated paper here>
[END_PAPER]

[START_SUMMARY]
<Insert a brief FAQ-style summary of important concepts here>
[END_SUMMARY]
`;

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
