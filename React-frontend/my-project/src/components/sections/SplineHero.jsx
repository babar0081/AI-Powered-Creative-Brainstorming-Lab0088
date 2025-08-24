import React from 'react';

const SplineHero = ({ openApp }) => {
  return (
    <div className="spline-container">
      <div className="spline-content">
        <h1>BrainStorm</h1>
        <p>Capture ideas fast, organize them visually, and turn thoughts into action — all in one clean workspace.</p>
        <button onClick={openApp}>LET'S EXPLORE TOGETHER</button>
      </div>
      <iframe
        className="spline-iframe"
        src="https://my.spline.design/3dconcreteshapecopy-f32a161729fc170b74efd2f90fdad7b6/"
        frameBorder="0"
        title="3D BrainStorm Visualization"
      ></iframe>
    </div>
  );
};

export default SplineHero;

