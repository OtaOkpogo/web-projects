import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    rating: '' // ✅ added rating
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // ✅ store rating in a variable as hinted
    const userRating = formData.rating;

    const confirmationMessage = `
Name: ${formData.name}
Email: ${formData.email}
Rating: ${userRating}
Feedback: ${formData.feedback}
    `;

    const isConfirmed = window.confirm(
      `Please confirm your details:\n${confirmationMessage}`
    );

    if (isConfirmed) {
      console.log('Submitting feedback:', formData);

      setFormData({
        name: '',
        email: '',
        feedback: '',
        rating: '' // reset rating
      });

      alert('Thank you for your valuable feedback!');
    }
  };

  return (
    <>
      <nav>Tell Us What You Think</nav>

      <form onSubmit={handleSubmit} className="feedback-form">
        <h2>We'd Love to Hear From You!</h2>
        <p>Please share your feedback with us.</p>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
        />

        {/* ✅ Rating radio buttons */}
        <div className="rating-section">
          <p>Rate your experience:</p>

          <label>
            <input
              type="radio"
              name="rating"
              value="Excellent"
              checked={formData.rating === 'Excellent'}
              onChange={handleChange}
            />
            Excellent
          </label>

          <label>
            <input
              type="radio"
              name="rating"
              value="Good"
              checked={formData.rating === 'Good'}
              onChange={handleChange}
            />
            Good
          </label>

          <label>
            <input
              type="radio"
              name="rating"
              value="Average"
              checked={formData.rating === 'Average'}
              onChange={handleChange}
            />
            Average
          </label>

          <label>
            <input
              type="radio"
              name="rating"
              value="Poor"
              checked={formData.rating === 'Poor'}
              onChange={handleChange}
            />
            Poor
          </label>
        </div>

        <textarea
          name="feedback"
          placeholder="Your Feedback"
          value={formData.feedback}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Submit Feedback</button>
      </form>
    </>
  );
};

export default FeedbackForm;  
