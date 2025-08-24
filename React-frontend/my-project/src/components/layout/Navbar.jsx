import React from 'react';

const Navbar = ({ activeTab, navigateTo, theme, toggleTheme, openApp, goHome }) => {
  return (
    <header className="nav">
      <div className="container inner">
        <a href="#" className="brand" onClick={(e) => { e.preventDefault(); goHome(); }}>
          <span className="logo" aria-hidden="true"></span> BrainStorm
        </a>
        <nav className="navlinks">
          <a
            href="#home"
            className={activeTab === 'home' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
          >
            Home
          </a>
          <a
            href="#features"
            className={activeTab === 'features' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); navigateTo('features'); }}
          >
            Features
          </a>
          <a
            href="#ai"
            className={activeTab === 'ai' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); navigateTo('ai'); }}
          >
            AI Models
          </a>
          <a
            href="#about"
            className={activeTab === 'about' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); navigateTo('about'); }}
          >
            About
          </a>
          <a
            href="#try"
            className={activeTab === 'try' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); navigateTo('try'); }}
          >
            Try
          </a>
          <a
            href="#app"
            className="pill"
            onClick={(e) => { e.preventDefault(); openApp(); }}
          >
            Open App →
          </a>
          <button
            className="toggle"
            title="Toggle theme"
            onClick={toggleTheme}
          >
            {theme === 'light' ? '☀️' : '🌙'}
            <span className="sr">Toggle theme</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;