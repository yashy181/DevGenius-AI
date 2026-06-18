import { useState } from "react";
import axios from "axios";

function CareerAdvisor() {

  const [skills, setSkills] = useState("");
  const [career, setCareer] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCareerAdvice = async () => {

    if (!skills) {
      alert("Please enter your skills");
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
              I know these skills:
              ${skills}

              Suggest:
              1. Best career paths
              2. Skills to learn next
              3. Salary opportunities
              4. Roadmap
              5. Best technologies to focus on
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

      setCareer(result);

    } catch (error) {

      console.log(error);

      setCareer(
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
          color: "#f59e0b",
        }}
      >
        AI Career Advisor
      </h1>

      <textarea
        placeholder="Enter your skills, interests, technologies..."
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
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
        onClick={generateCareerAdvice}
        style={{
          marginTop: "20px",
          padding: "15px 30px",
          background: "#f59e0b",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Get Career Advice"}
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
        {career}
      </div>

    </div>
  );
}

export default CareerAdvisor;