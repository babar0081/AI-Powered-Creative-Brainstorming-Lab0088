// import React, { useEffect, useRef } from 'react';

// const Hero = ({ openApp, setActiveTab }) => {
//   const heroRef = useRef(null);
  
//   // Force scroll to top when hero mounts
//   useEffect(() => {
//     if (heroRef.current) {
//       window.scrollTo(0, 0);
//     }
//   }, []);
  
//   return (
//     <section className="hero" id="home" ref={heroRef}>
//       <div className="container">
//         <div className="hero-content">
//           <span className="tag">Idea → Plan → Action</span>
//           <h1>Turn messy thoughts into a <span className="gradient">clear plan</span>.</h1>
//           <p>Capture ideas, sort them into stages, and keep momentum with a lightweight board — no signup required.</p>
//           <div className="cta">
//             <button 
//               className="btn" 
//               onClick={openApp}
//             >
//               START BRAINSTORMING
//             </button>
//             <a 
//               className="btn secondary" 
//               href="#ai" 
//               onClick={(e) => {
//                 e.preventDefault();
//                 setActiveTab('ai');
//               }}
//             >
//               See AI Models
//             </a>
//           </div>
//           <div className="floaters" aria-hidden="true">
//             <div className="floating-shape b"></div>
//             <div className="floating-shape c"></div>
//             <div className="floating-shape d"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React from 'react';

const Hero = ({ openApp, setActiveTab }) => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <span className="tag">Idea → Plan → Action</span>
          <h1>Turn messy thoughts into a <span className="gradient">clear plan</span>.</h1>
          <p>Capture ideas, sort them into stages, and keep momentum with a lightweight board — no signup required.</p>
          <div className="cta">
            <button
              className="btn"
              onClick={openApp}
            >
              START BRAINSTORMING
            </button>
            <a
              className="btn secondary"
              href="#ai"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('ai');
              }}
            >
              See AI Models
            </a>
          </div>
          <div className="floaters" aria-hidden="true">
            <div className="floating-shape b"></div>
            <div className="floating-shape c"></div>
            <div className="floating-shape d"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;