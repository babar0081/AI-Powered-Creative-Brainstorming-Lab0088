import React from 'react';

const AIModels = () => {
  return (
    <section className="ai container" id="ai">
      <h2>AI Models</h2>
      <p className="muted">Optional helpers you can integrate.</p>
      <div className="grid" style={{ marginTop: '.8rem' }}>
        <div className="card">
          <h3>💡 Optimist</h3>
          <p>Generates bold opportunities and encourages creative directions.</p>
        </div>
        <div className="card">
          <h3>🧠 Critic</h3>
          <p>Identifies risks, flaws, and challenges so weak ideas don't slip through.</p>
        </div>
        <div className="card">
          <h3>🎨 Analyst</h3>
          <p>Evaluates data, compares scenarios, and measures feasibility objectively.</p>
        </div>
      </div>

      <div className="board-visual">
        <div className="table-center optimist">Optimist 🧭</div>
        <div className="avatar" style={{ left: '50%', top: '12%', transform: 'translate(-50%,0)', animationDelay: '.1s' }}>
          🌟<span className="bubble">Optimist: This idea can fly!</span>
        </div>
        <div className="avatar" style={{ left: '16%', top: '26%', animationDelay: '.3s' }}>
          🚀<span className="bubble">Optimist: Imagine the possibilities!</span>
        </div>
        <div className="avatar" style={{ left: '84%', top: '26%', animationDelay: '.5s' }}>
          🌈<span className="bubble">Optimist: We can scale this big!</span>
        </div>
        <div className="avatar" style={{ left: '12%', top: '62%', animationDelay: '.7s' }}>
          💡<span className="bubble">Optimist: Users will love it!</span>
        </div>
        <div className="avatar" style={{ left: '88%', top: '62%', animationDelay: '.9s' }}>
          🎉<span className="bubble">Optimist: Let's make it shine!</span>
        </div>
        <div className="avatar" style={{ left: '50%', top: '82%', transform: 'translate(-50%,0)', animationDelay: '1.1s' }}>
          🔮<span className="bubble">Optimist: The future looks bright!</span>
        </div>
      </div>

      <div className="board-visual">
        <div className="table-center critic">Critic 🧭</div>

        <div className="avatar" style={{ left: '50%', top: '12%', transform: 'translate(-50%,0)', animationDelay: '.1s' }}>
          🧐<span className="bubble">Is this really practical?</span>
        </div>
        <div className="avatar" style={{ left: '16%', top: '26%', animationDelay: '.3s' }}>
          ⚖️<span className="bubble">We might be overcomplicating it.</span>
        </div>
        <div className="avatar" style={{ left: '84%', top: '26%', animationDelay: '.5s' }}>
          ⏳<span className="bubble">This could take too much time.</span>
        </div>
        <div className="avatar" style={{ left: '12%', top: '62%', animationDelay: '.7s' }}>
          💸<span className="bubble">The cost might outweigh the benefit.</span>
        </div>
        <div className="avatar" style={{ left: '88%', top: '62%', animationDelay: '.9s' }}>
          🛑<span className="bubble">What if users reject it?</span>
        </div>
        <div className="avatar" style={{ left: '50%', top: '82%', transform: 'translate(-50%,0)', animationDelay: '1.1s' }}>
          ❗<span className="bubble">We should be careful with this move.</span>
        </div>
      </div>

      <div className="board-visual">
        <div className="table-center analyst">Analyst 🧭</div>
        <div className="avatar" style={{ left: '50%', top: '12%', transform: 'translate(-50%,0)', animationDelay: '.1s' }}>
          📊<span className="bubble">The data trends suggest potential.</span>
        </div>
        <div className="avatar" style={{ left: '16%', top: '26%', animationDelay: '.3s' }}>
          🧮<span className="bubble">Let's compare this with past results.</span>
        </div>
        <div className="avatar" style={{ left: '84%', top: '26%', animationDelay: '.5s' }}>
          🧾<span className="bubble">The metrics need closer evaluation.</span>
        </div>
        <div className="avatar" style={{ left: '12%', top: '62%', animationDelay: '.7s' }}>
          🔍<span className="bubble">We should validate assumptions first.</span>
        </div>
        <div className="avatar" style={{ left: '88%', top: '62%', animationDelay: '.9s' }}>
          📐<span className="bubble">Modeling shows mixed outcomes.</span>
        </div>
        <div className="avatar" style={{ left: '50%', top: '82%', transform: 'translate(-50%,0)', animationDelay: '1.1s' }}>
          📚<span className="bubble">Evidence points to multiple options.</span>
        </div>
      </div>
    </section>
  );
};

export default AIModels;
