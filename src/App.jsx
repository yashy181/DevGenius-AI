import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import CodeReviewer from "./components/CodeReviewer";
import InterviewGenerator from "./components/InterviewGenerator";
import CareerAdvisor from "./components/CareerAdvisor";

function App() {

  const [page, setPage] = useState("dashboard");

  return (
    <div
      style={{
        display: "flex",
        background: "#000",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >

      <Sidebar setPage={setPage} />

      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >

        {page === "dashboard" && <Dashboard />}
        {page === "resume" && <ResumeAnalyzer />}
        {page === "code" && <CodeReviewer />}
        {page === "interview" && <InterviewGenerator />}
        {page === "career" && <CareerAdvisor />}

      </div>

    </div>
  );
}

export default App;