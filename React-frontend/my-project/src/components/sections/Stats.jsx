import React, { useEffect, useRef } from 'react';

const Stats = () => {
  const countersObserved = useRef(false);
  const numRefs = useRef([]);

  useEffect(() => {
    if (countersObserved.current) return;
    
    const nums = numRefs.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        let cur = 0;
        const step = Math.ceil(target / 60);
        
        const tick = () => {
          cur = Math.min(target, cur + step);
          el.textContent = cur.toLocaleString();
          if (cur < target) {
            requestAnimationFrame(tick);
          }
        };
        
        tick();
        observer.unobserve(el);
      });
    }, { threshold: 0.3 });
    
    nums.forEach(n => observer.observe(n));
    countersObserved.current = true;
    
    return () => {
      nums.forEach(n => n && observer.unobserve(n));
    };
  }, []);

  return (
    <section className="container stats" id="stats">
      <div className="stat">
        <div 
          className="num" 
          data-count="128" 
          ref={el => el && numRefs.current.push(el)}
        >
          0
        </div>
        <div className="muted">Ideas captured today</div>
      </div>
      <div className="stat">
        <div 
          className="num" 
          data-count="4823" 
          ref={el => el && numRefs.current.push(el)}
        >
          0
        </div>
        <div className="muted">Total boards created</div>
      </div>
      <div className="stat">
        <div 
          className="num" 
          data-count="97" 
          ref={el => el && numRefs.current.push(el)}
        >
          0
        </div>
        <div className="muted">Teams using BrainStorm</div>
      </div>
    </section>
  );
};

export default Stats;
