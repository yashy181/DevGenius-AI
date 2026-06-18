import { useState } from "react";
import axios from "axios";

function InterviewGenerator() {

  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {

    if (!topic) {
      alert("Please enter a topic");
      return;
    }

    setLoading(true);

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    try {

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `
              Generate 5 interview questions with answers about ${topic}
              for software engineering interviews.
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

      setQuestions(result);

    } catch (error) {

      console.log(error);

      setQuestions(
        "Error: " +
        (error.response?.data?.error?.message || error.message)
      );
    }

    setLoading(false);
  };

  return (
    <div>

      <h1
        style={{
          fontSize: "40px",
          color: "#a855f7",
        }}
      >
        AI Interview Generator
      </h1>

      <input
        type="text"
        placeholder="Enter topic like React, DSA, Java..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{
          width: "90%",
          padding: "18px",
          marginTop: "20px",
          borderRadius: "12px",
          border: "none",
          background: "#1f2937",
          color: "white",
          fontSize: "16px",
        }}
      />

      <br />

      <button
        onClick={generateQuestions}
        style={{
          marginTop: "20px",
          padding: "15px 30px",
          background: "#9333ea",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Questions"}
      </button>

      <div
        style={{
          marginTop: "30px",
          background: "#111827",
          padding: "20px",
          borderRadius: "12px",
          whiteSpace: "pre-wrap",
          lineHeight: "1.8",
        }}
      >
        {questions}
      </div>

    </div>
  );
}

export default InterviewGenerator;