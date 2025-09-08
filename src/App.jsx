import React, { useState } from "react";

export default function App() {
  const [text, setText] = useState('{\n  "hello": "world"\n}');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  function validateAndFormat() {
    setError(null);
    setResult(null);
    try {
      const parsed = JSON.parse(text);
      const pretty = JSON.stringify(parsed, null, 2);
      setResult(pretty);
    } catch (e) {
      setError(e.message);
    }
  }

  function copyResult() {
    if (result) navigator.clipboard.writeText(result);
  }

  function downloadResult() {
    if (!result) return;
    const blob = new Blob([result], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ maxWidth: 900, margin: "30px auto", fontFamily: "sans-serif" }}>
      <h1>JSON Validator</h1>
      <p>Paste JSON below and click Validate & Format.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", height: 200, fontFamily: "monospace" }}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={validateAndFormat}>Validate & Format</button>
        <button onClick={copyResult} disabled={!result}>Copy</button>
        <button onClick={downloadResult} disabled={!result}>Download</button>
      </div>

      <div style={{ marginTop: 20, whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
        {error ? <span style={{ color: "red" }}>Error: {error}</span> : result ? <pre>{result}</pre> : <em>Result will appear here</em>}
      </div>
    </div>
  );
}
