import React from 'react';

const LogosRow = () => {
  return (
    <section className="logos" aria-label="Powered by a team of AI agents">
      <div className="container">
        <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>
          Powered By Our AI Agent Team
        </p>
        <div className="logo-row">
          <div className="logo-cell">Optimist</div>
          <div className="logo-cell">Critic</div>
          <div className="logo-cell">Analyst</div>
          <div className="logo-cell">Moderator</div>
          <div className="logo-cell">Search</div>
        </div>
      </div>
    </section>
  );
};

export default LogosRow;
