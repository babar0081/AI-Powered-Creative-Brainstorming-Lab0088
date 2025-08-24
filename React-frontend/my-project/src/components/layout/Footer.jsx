import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      <div className="container">
        © {currentYear} BrainStorm • Crafted for quick ideation • 
        <a href="#about">About</a> • 
        <a href="#features">Features</a> • 
        <a href="#ai">AI Models</a> • 
        <a href="#try">Try</a>
        <div style={{ marginTop: '.6rem', display: 'flex', gap: '.6rem', justifyContent: 'center' }}>
          {/* <a className="pill" href="#" aria-label="GitHub">GitHub</a>
          <a className="pill" href="#" aria-label="LinkedIn">LinkedIn</a>
          <a className="pill" href="#" aria-label="Twitter">Twitter/X</a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
