import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>🔍 Lost & Found Portal</h3>
          <p>PMAS-Arid Agriculture University, Rawalpindi</p>
          <p>Helping reunite students with their lost belongings</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/lost">Lost Items</a></li>
            <li><a href="/found">Found Items</a></li>
            <li><a href="/add-item">Report Item</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>📞 Campus Security: +92-51-1234567</p>
          <p>📧 lostfound@uaar.edu.pk</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Lost & Found Portal - PMAS-AAUR</p>
      </div>
    </footer>
  );
}

export default Footer;