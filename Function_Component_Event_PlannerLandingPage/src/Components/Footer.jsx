import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={aboutStyle}>
          <h3>Event Planner</h3>
          <p>Making your event planning effortless and memorable.</p>
        </div>
        <div style={linksStyle}>
          <h4>Quick Links</h4>
          <ul style={listStyle}>
            <li><a href="#features" style={linkStyle}>Features</a></li>
            <li><a href="#events_categories" style={linkStyle}>Events</a></li>
            <li><a href="#contact" style={linkStyle}>Contact</a></li>
          </ul>
        </div>
        <div style={contactStyle}>
          <h4>Contact Us</h4>
          <p>Email: support@eventplanner.com</p>
          <p>Phone: +1 234 567 8900</p>
          <p>© 2025 Event Planner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Inline styles — you can move these to CSS if preferred
const footerStyle = {
  backgroundColor: '#ff69b4', // match your header background
  color: '#fff',
  padding: '40px 20px',
  fontFamily: '"Trebuchet MS", Arial, sans-serif',
  marginTop: '40px',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: '30px',
};

const aboutStyle = {
  flex: '1 1 250px',
  minWidth: '250px',
};

const linksStyle = {
  flex: '1 1 150px',
  minWidth: '150px',
};

const contactStyle = {
  flex: '1 1 250px',
  minWidth: '250px',
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  display: 'block',
  margin: '6px 0',
};

export default Footer;
