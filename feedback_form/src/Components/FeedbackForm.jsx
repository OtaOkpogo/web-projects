import React, { useState } from 'react';
import './FeedbackForm.css'; // Import CSS for styling

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    rating: '' // New state for rating
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

    // ✅ Store rating in a variable (as required by hint)
    const userRating = formData.rating;

    const confirmationMessage = `
Name: ${formData.name}
Email: ${formData.email}
Feedback: ${formData.feedback}
Rating: ${userRating}
    `;

    const isConfirmed = window.confirm(
      `Please confirm your details:\n\n${confirmationMessage}`
    );

    if (isConfirmed) {
      console.log('Submitting feedback:', formData);

      setFormData({
        name: '',
        email: '',
        feedback: '',
        rating: '' // Reset rating after submission
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

        <textarea
          name="feedback"
          placeholder="Your Feedback"
          value={formData.feedback}
          onChange={handleChange}
        ></textarea>

        {/* ✅ Vertical Rating Section */}
        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <span>Rate Us:</span>

          {[1, 2, 3, 4, 5].map((num) => (
            <label key={num}>
              <input
                type="radio"
                name="rating"
                value={num}
                checked={formData.rating === String(num)}
                onChange={handleChange}
              />{' '}
              {num}
            </label>
          ))}
        </div>

        <button type="submit">Submit Feedback</button>
      </form>
    </>
  );
};

export default FeedbackForm;
