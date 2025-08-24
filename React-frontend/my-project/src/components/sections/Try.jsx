// // src/components/sections/Try.jsx

// import React, { useState, useEffect } from 'react';

// const Try = ({ openApp, startFullDebate, initialIdea }) => {
//   const [ideaInput, setIdeaInput] = useState(initialIdea || '');
//   const [optimistResponse, setOptimistResponse] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // Sync local state if the user navigates back to this tab
//   useEffect(() => {
//     setIdeaInput(initialIdea || '');
//   }, [initialIdea]);

//   const handleDemoSubmit = (e) => {
//     e.preventDefault();
//     if (!ideaInput.trim()) return;
//     setIsLoading(true);
//     setOptimistResponse('');
//     // Simulating an API call to the optimist agent
//     setTimeout(() => {
//       const simulatedResponse = `This is a fantastic starting point! The idea to "${ideaInput}" could revolutionize the market by tapping into emerging consumer needs. We could build a platform that not only solves this problem but also creates a community around it.`;
//       setOptimistResponse(simulatedResponse);
//       setIsLoading(false);
//     }, 1500);
//   };

//   return (
//     <section className="try container" id="try">
//       <div className="try-content">
//         <h2>Get an Instant AI Perspective</h2>
//         <p className="muted">
//           Curious what our AI thinks? Enter a concept, and get an instant take from our
//           Optimist agent. See the full debate in the app.
//         </p>

//         <div className="try-interactive-area">
//           <form className="try-form" onSubmit={handleDemoSubmit}>
//             <textarea
//               value={ideaInput}
//               onChange={(e) => setIdeaInput(e.target.value)}
//               placeholder="e.g., A mobile app for local plant swaps..."
//               rows="2"
//               disabled={isLoading}
//             />
//             <button type="submit" className="btn" disabled={isLoading}>
//               {isLoading ? 'Generating...' : 'Get an Instant Take'}
//             </button>
//           </form>

//           {isLoading && (
//             <div className="loading-response">
//               <span>Optimist is thinking...</span>
//             </div>
//           )}

//           {optimistResponse && (
//             <div className="try-output">
//               <div className="optimist-response-card">
//                 <div className="card-header">
//                   <span role="img" aria-label="Optimist">💡</span> The Optimist's Take
//                 </div>
//                 <p>{optimistResponse}</p>
//                 <div className="card-footer">
//                   {/* FIX: Call startFullDebate with the current idea */}
//                   <button className="btn btn-glow" onClick={() => startFullDebate(ideaInput)}>
//                     See the Full Debate →
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Try;
// src/components/sections/Try.jsx

import React, { useState } from 'react';

// FIX: Receive tryIdea and setTryIdea from props and remove initialIdea
const Try = ({ openApp, startFullDebate, tryIdea, setTryIdea }) => {
  const [optimistResponse, setOptimistResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (!tryIdea.trim()) return; // FIX: Use tryIdea from props
    setIsLoading(true);
    setOptimistResponse('');
    
    setTimeout(() => {
      const simulatedResponse = `This is a fantastic starting point! The idea to "${tryIdea}" could revolutionize the market by tapping into emerging consumer needs. We could build a platform that not only solves this problem but also creates a community around it.`; // FIX: Use tryIdea here too
      setOptimistResponse(simulatedResponse);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="try container" id="try">
      <div className="try-content">
        <h2>Get an Instant AI Perspective</h2>
        <p className="muted">
          Curious what our AI thinks? Enter a concept, and get an instant take from our
          Optimist agent. See the full debate in the app.
        </p>

        <div className="try-interactive-area">
          <form className="try-form" onSubmit={handleDemoSubmit}>
            <textarea
              value={tryIdea} // FIX: Use tryIdea from props
              onChange={(e) => setTryIdea(e.target.value)} // FIX: Use setTryIdea from props
              placeholder="e.g., A mobile app for local plant swaps..."
              rows="2"
              disabled={isLoading}
            />
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Get an Instant Take'}
            </button>
          </form>

          {isLoading && (
            <div className="loading-response">
              <span>Optimist is thinking...</span>
            </div>
          )}

          {optimistResponse && (
            <div className="try-output">
              <div className="optimist-response-card">
                <div className="card-header">
                  <span role="img" aria-label="Optimist">💡</span> The Optimist's Take
                </div>
                <p>{optimistResponse}</p>
                <div className="card-footer">
                  <button className="btn btn-glow" onClick={() => startFullDebate(tryIdea)}>
                    See the Full Debate →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Try;