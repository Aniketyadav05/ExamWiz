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
    mutationFn: generateAndStorePaper, // 👈 changed
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
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isPending ? "Generating..." : "Generate & Submit"}
        </button>

        {isError && <p className="text-red-500">❌ Failed to generate or save. Try again.</p>}
      </form>

      {result && (
        <div className="mt-6 text-black">
          <h2 className="font-semibold text-lg mb-2">📝 Generated Paper</h2>
          <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">{result.generated_paper}</pre>
          <h2 className="font-semibold text-lg mt-4 mb-2">🧾 Summary</h2>
          <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">{result.summary}</pre>
        </div>
      )}
    </div>
  );
};

export default ExamForm;
