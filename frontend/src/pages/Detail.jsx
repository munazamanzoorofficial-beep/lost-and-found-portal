import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById } from '../services/api';
import './Detail.css';

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    setLoading(true);
    const data = await getItemById(id);
    setItem(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="spinner"></div>
        <p>Loading item details...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="detail-error">
        <h2>Item not found</h2>
        <button onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <div className="detail-card">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="detail-image-section">
          <img src={item.imageUrl} alt={item.title} className="detail-image" />
          <div className="detail-status-badge">
            <span className={`status ${item.status}`}>
              {item.status === 'lost' ? '🔴 LOST' : '🟢 FOUND'}
            </span>
          </div>
        </div>

        <div className="detail-content">
          <h1 className="detail-title">{item.title}</h1>
          
          <div className="detail-description">
            <h3>Description</h3>
            <p>{item.description}</p>
          </div>

          <div className="detail-info">
            <div className="info-card">
              <div>📍</div>
              <div>
                <strong>Location</strong>
                <p>{item.location}</p>
              </div>
            </div>

            <div className="info-card">
              <div>📞</div>
              <div>
                <strong>Contact Number</strong>
                <p>{item.phoneNumber}</p>
              </div>
            </div>

            <div className="info-card">
              <div>📅</div>
              <div>
                <strong>Date Reported</strong>
                <p>{new Date(item.date).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="info-card">
              <div>🆔</div>
              <div>
                <strong>Report ID</strong>
                <p>#{item.id}</p>
              </div>
            </div>
          </div>

          <div className="detail-actions">
            <button 
              className="call-btn"
              onClick={() => window.location.href = `tel:${item.phoneNumber}`}
            >
              📞 Call Now
            </button>
            <button 
              className="report-btn"
              onClick={() => navigate('/add-item')}
            >
              📝 Report Similar Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;