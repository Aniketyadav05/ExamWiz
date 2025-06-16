import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { generateAndStorePaper } from "../services/conf";

const ExamForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    year: "",
    university: "",
    degree: "",
  });

  const { mutate, data: result, isPending, isError } = useMutation({
    mutationFn: generateAndStorePaper,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 sm:py-32 text-[#f8fafc]">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        📄 Generate Question Papers Effortlessly
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-[#1e293b] p-6 rounded-2xl shadow-lg"
      >
        {["subject", "year", "university", "degree"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#0f172a] text-[#f8fafc] border border-[#334155] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
          />
        ))}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold py-2 px-4 rounded-md transition"
        >
          {isPending ? "Generating..." : "✨ Generate & Submit"}
        </button>

        {isError && (
          <p className="text-[#f43f5e] text-center">❌ Failed to generate. Try again.</p>
        )}
      </form>

      {result && (
        <div className="mt-10 bg-[#1e293b] p-6 rounded-2xl shadow-md">
          <h2 className="font-semibold text-xl mb-2">📝 Generated Paper</h2>
          <pre className="bg-[#0f172a] p-4 rounded-md text-sm whitespace-pre-wrap overflow-auto text-[#f8fafc]">
            {result.generated_paper}
          </pre>

          <h2 className="font-semibold text-xl mt-6 mb-2">🧾 Summary</h2>
          <pre className="bg-[#0f172a] p-4 rounded-md text-sm whitespace-pre-wrap overflow-auto text-[#f8fafc]">
            {result.summary}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ExamForm;
