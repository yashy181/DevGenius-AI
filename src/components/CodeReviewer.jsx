import { useState } from "react";
import axios from "axios";

function CodeReviewer() {

  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const reviewCode = async () => {

    if (!code) {
      alert("Please paste code");
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
              Review this code.

              Give:
              1. Code Quality
              2. Bugs
              3. Optimization Suggestions
              4. Best Practices
              5. Improved Version

              Code:
              ${code}
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

      setReview(result);

    } catch (error) {

      console.log(error);

      setReview(
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
          color: "#22c55e",
        }}
      >
        AI Code Reviewer
      </h1>

      <textarea
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          width: "90%",
          height: "220px",
          padding: "20px",
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
        onClick={reviewCode}
        style={{
          marginTop: "20px",
          padding: "15px 30px",
          background: "#22c55e",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        {loading ? "Reviewing..." : "Review Code"}
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
        {review}
      </div>

    </div>
  );
}

export default CodeReviewer;