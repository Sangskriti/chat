import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    if (!question.trim()) return; // Prevent empty input

    setAnswer("Loading...");

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAblKVl5WRbJ83m0yDSyfydO71q9FR7AEQ",
        {
          contents: [{ parts: [{ text: question }] }],
        }
      );

      const aiResponse =
        response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
      
      setAnswer(aiResponse);
    } catch (error) {
      console.error("API Error:", error);
      setAnswer("⚠️ Error: Unable to generate answer. Try again!");
    }
  }

  return (
    <div className="app">
      <h1>Chat AI</h1>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols="30"
        rows="10"
      ></textarea>

      <button onClick={generateAnswer}>Generate Answer</button>

      <pre>{answer}</pre>
    </div>
  );
}

export default App;
