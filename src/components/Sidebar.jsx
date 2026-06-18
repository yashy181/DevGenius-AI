function Sidebar({ setPage }) {

  const buttonStyle = {
    width: "100%",
    padding: "15px",
    marginTop: "10px",
    background: "#111827",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div
      style={{
        width: "250px",
        background: "#0f172a",
        padding: "20px",
      }}
    >

      <h1
        style={{
          color: "#60a5fa",
          textAlign: "center",
        }}
      >
        DevGenius AI
      </h1>

      <button style={buttonStyle} onClick={() => setPage("dashboard")}>
        Dashboard
      </button>

      <button style={buttonStyle} onClick={() => setPage("resume")}>
        Resume Analyzer
      </button>

      <button style={buttonStyle} onClick={() => setPage("code")}>
        Code Reviewer
      </button>

      <button style={buttonStyle} onClick={() => setPage("interview")}>
        Interview Generator
      </button>

      <button style={buttonStyle} onClick={() => setPage("career")}>
        Career Advisor
      </button>

    </div>
  );
}

export default Sidebar;