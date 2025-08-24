import React from 'react';

const Testimonials = () => {
  return (
    <section className="testimonials container" id="testimonials">
      <h2>What people say</h2>
      <div className="grid" style={{ marginTop: '.8rem' }}>
        <div className="testimonial">
          <p>⭐⭐⭐⭐⭐ "Clean and fast. Our team ideation time dropped by 30%."</p>
          <small className="muted">— Priya</small>
        </div>
        <div className="testimonial">
          <p>⭐⭐⭐⭐⭐ "Love the privacy-first approach. Zero setup."</p>
          <small className="muted">— Ahmed</small>
        </div>
        <div className="testimonial">
          <p>⭐⭐⭐⭐⭐ "Exactly the right amount of features."</p>
          <small className="muted">— Maria</small>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
