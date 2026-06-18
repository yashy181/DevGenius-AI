import { useState } from "react";
import axios from "axios";

import pdfToText from "react-pdftotext";

function ResumeAnalyzer() {

  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  // Upload & Extract PDF Text
  const handleFileUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFileName(file.name);

    try {

      const text = await pdfToText(file);

      setResumeText(text);

    } catch (error) {

      console.log(error);

      alert("Failed to extract PDF text");
    }
  };

  // Analyze Resume
  const analyzeResume = async () => {

    if (!resumeText) {
      alert("Please upload a resume PDF");
      return;
    }

    setLoading(true);

    const apiKey =
      import.meta.env.VITE_OPENROUTER_API_KEY;

    try {

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",

        {
          model: "openai/gpt-3.5-turbo",

          messages: [
            {
              role: "user",

              content: `
Analyze this resume professionally.

Give response in this format:

ATS Score: __/100

Strengths:
- ...

Weaknesses:
- ...

Missing Skills:
- ...

Suggestions:
- ...

Resume:
${resumeText}
              `,
            },
          ],
        },

        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result =
        response.data.choices[0].message.content;

      setAnalysis(result);

    } catch (error) {

      console.log(error);

      setAnalysis(
        "Error: " +
        (
          error.response?.data?.error?.message ||
          error.message
        )
      );
    }

    setLoading(false);
  };

  return (
    <div>

      <h1
        style={{
          fontSize: "40px",
          color: "#60a5fa",
        }}
      >
        AI Resume Analyzer
      </h1>

      <p
        style={{
          color: "#9ca3af",
          marginBottom: "20px",
        }}
      >
        Upload your resume PDF for AI ATS analysis
      </p>

      {/* Upload PDF */}
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        style={{
          marginBottom: "15px",
          color: "white",
        }}
      />

      {/* File Name */}
      {fileName && (
        <p
          style={{
            color: "#22c55e",
          }}
        >
          Uploaded: {fileName}
        </p>
      )}

      {/* Analyze Button */}
      <button
        onClick={analyzeResume}
        style={{
          marginTop: "20px",
          padding: "15px 30px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {loading
          ? "Analyzing..."
          : "Analyze Resume"}
      </button>

      {/* Result */}
      <div
        style={{
          marginTop: "30px",
          background: "#111827",
          padding: "20px",
          borderRadius: "12px",
          whiteSpace: "pre-wrap",
          lineHeight: "1.8",
          color: "white",
        }}
      >
        {analysis}
      </div>

    </div>
  );
}

export default ResumeAnalyzer;