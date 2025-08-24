import React from 'react';

const About = ({ openApp }) => {
  return (
    <section className="about container" id="about">
      <div className="about-text-content">
        <h2>Why BrainStorm?</h2>
        <p className="muted">
          BrainStorm helps you capture messy thoughts, organize them, and track progress
          efficiently. Perfect for solo thinkers and teams alike.
        </p>
        <ul className="why-list">
          <li><span className="bullet-icon" role="img" aria-label="bullet point">🔹</span> Add ideas quickly with the input bar.</li>
          <li><span className="bullet-icon" role="img" aria-label="bullet point">🔸</span> Optional tags like #research, #design, #risk.</li>
          <li><span className="bullet-icon" role="img" aria-label="bullet point">❗️</span> Export everything to keep your notes synced.</li>
        </ul>
        <div className="about-actions">
          <button className="btn btn-glow" onClick={openApp}>Open the App</button>
          <span className="pill">No account • Works offline</span>
        </div>
      </div>
      <div className="about-illustration-wrapper">
        <div className="illustration-window">
            <div className="window-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
            </div>
            <div className="window-body">
                <div className="window-col">
                    <div className="window-card"></div>
                    <div className="window-card"></div>
                    <div className="window-card"></div>
                </div>
                <div className="window-col">
                    <div className="window-card short"></div>
                </div>
                <div className="window-col">
                    <div className="window-card short"></div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;