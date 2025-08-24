import React, { useEffect } from 'react';

const SplineHero = ({ openApp }) => {
  useEffect(() => {
    // Add transition property to spline-container on mount
    const splineContainer = document.querySelector('.spline-container');
    if (splineContainer) {
      splineContainer.style.transition = 'opacity 0.5s ease-in-out';
    }
    
    // Lock scrolling while in SplineHero view
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Reset overflow when component unmounts
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="spline-container">
      <div className="spline-content">
        <h1>BrainStorm</h1>
        <p>Capture ideas fast, organize them visually, and turn thoughts into action — all in one clean workspace.</p>
        <button 
          onClick={openApp} 
          className="explore-button"
          style={{pointerEvents: 'auto'}}
        >Let's Explore Together</button>
      </div>
      <iframe
        className="spline-iframe"
        src="https://my.spline.design/3dconcreteshapecopy-f32a161729fc170b74efd2f90fdad7b6/"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default SplineHero;
