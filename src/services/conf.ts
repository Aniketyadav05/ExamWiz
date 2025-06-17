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

const prompt = `You are an expert AI trained on academic data from top universities and specialized in generating exam papers. Your task is to simulate an in-depth analysis of past university exams to create a realistic and pedagogically sound question paper.

Use the following inputs as your search criteria:
- Subject: ${formData.subject}
- Degree: ${formData.degree}
- Year of Study: ${formData.year}
- University: ${formData.university}

Step-by-Step Instructions:

1. Simulate Retrieval of Past Papers (Last 5 Years):  
Pretend you've accessed and reviewed the official university archives and exam repositories. Identify trends in the last five years of question papers for this course:
- Detect frequently repeated questions or themes.
- Identify high-weightage units and core conceptual areas.
- Consider the academic focus and syllabus design typical for this university and degree program.

2. Analyze Patterns and Examiner Preferences:  
- Extract key focus areas that appear consistently (e.g., derivations, case studies, applied problems, theoretical principles).
- Note the balance between memory-based, application-based, and analytical questions.

3. Generate a New, Realistic Exam Paper:  
Using your insights, draft a fresh and balanced question paper. Structure it into the following sections:
- Section A – Short Answer Questions (6 to 10 questions)
- Section B – Long Answer Questions (4 to 6 questions)
- Section C – Frequently Asked Conceptual Questions (3 to 5 questions)

Formatting Guidelines:
- Number each question simply (e.g., 1, 2, 3...)
- Use plain text only.
- Do not include any special characters, markdown, bullet points, asterisks, or formatting.
- The content should feel authentic and match the tone, phrasing, and depth used in real university exams.

4. Provide an Academic Summary for Students:
After the paper, write a brief academic advisory summary:
- Outline the 3–4 most important and frequently examined concepts.
- Provide study focus tips in clear, academic English.
- Make it sound like a concise preparation guide from a professor.

OUTPUT FORMAT (STRICTLY FOLLOW):

[START_PAPER]
<Insert the generated paper here in plain text>
[END_PAPER]

[START_SUMMARY]
<Insert a 3–4 line academic summary of the most frequently tested topics and how a student should prepare>
[END_SUMMARY]`

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
