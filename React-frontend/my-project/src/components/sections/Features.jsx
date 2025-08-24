// import React from 'react';

// const Features = () => {
//   return (
//     <section className="features container" id="features">
//       <h2>Features</h2>
//       <p className="muted">Fast capture, clear stages, exports, and privacy by default — plus some smart extras.</p>
//       <div className="grid" style={{ marginTop: '.8rem' }}>
//         <div className="card">
//           <h3>⚡ Fast Capture</h3>
//           <p>Hit + and drop an idea on the board. Keyboard friendly.</p>
//         </div>
//         <div className="card">
//           <h3>🗂️ Simple Stages</h3>
//           <p>To‑Do, In Progress, Done. Add your own tags for clarity.</p>
//         </div>
//         <div className="card">
//           <h3>🧭 One Focus Metric</h3>
//           <p>Star what matters. Keep your team aligned on outcomes.</p>
//         </div>
//         <div className="card">
//           <h3>📤 Export</h3>
//           <p>Copy to clipboard or download your session as JSON.</p>
//         </div>
//         <div className="card">
//           <h3>🎯 AI Suggestions</h3>
//           <p>Get gentle nudges and organize ideas with smart hints.</p>
//         </div>
//         <div className="card">
//           <h3>🔒 Offline & Local</h3>
//           <p>Your data stays in your browser. No accounts, no servers.</p>
//         </div>
//         <div className="card">
//           <h3>✨ Smooth UX</h3>
//           <p>Hover glow, subtle motion, and clean dark/light modes.</p>
//         </div>
//         <div className="card">
//           <h3>🧩 Extensible</h3>
//           <p>Plug in AI models later without changing your workflow.</p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;

import React from 'react';

const Features = () => {
  return (
    <section className="features container" id="features">
      <h2>How It Works</h2>
      <p className="muted">Your idea is refined through a structured, real-time debate between a team of specialized AI agents.</p>
      <div className="grid" style={{ marginTop: '.8rem' }}>
        <div className="card">
          <h3>⚡️ Multi-Agent Debate</h3>
          <p>An Optimist, Critic, and Analyst debate the pros and cons of your idea in real-time.</p>
        </div>
        <div className="card">
          <h3>🌐 Live Web Validation</h3>
          <p>An agent performs a real-time web search to ground the debate with current data and facts.</p>
        </div>
        <div className="card">
          <h3>📈 Data-Driven Analysis</h3>
          <p>The Analyst synthesizes the debate and search results, providing a balanced summary with cited sources.</p>
        </div>
        <div className="card">
          <h3>✅ Actionable Summary</h3>
          <p>The Moderator delivers a final verdict and a concrete 'Next Step' to move your idea forward.</p>
        </div>
        <div className="card">
          <h3>🚀 Blazing-Fast Streaming</h3>
          <p>Powered by Groq's Llama 3.1, the debate unfolds token-by-token for a live, engaging experience.</p>
        </div>
        <div className="card">
          <h3>🧠 Structured Workflow</h3>
          <p>Using LangGraph, the debate follows a logical path from idea to a well-rounded conclusion.</p>
        </div>
        <div className="card">
          <h3>🔗 Source-Cited Insights</h3>
          <p>Facts and data used by the Analyst include direct links to the original sources for full transparency.</p>
        </div>
        <div className="card">
          <h3>Modern Tech Stack</h3>
          <p>Built with a robust backend (FastAPI, LangChain) and a responsive frontend (React, Vite).</p>
        </div>
      </div>
    </section>
  );
};

export default Features;