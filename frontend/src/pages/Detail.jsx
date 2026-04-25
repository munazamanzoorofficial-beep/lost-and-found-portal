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
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    setLoading(true);
    try {
      const data = await getItemById(id);
      setItem(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="detail-error">
        <h2>Item not found</h2>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <div className="detail-card">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

        <div className="detail-image-section">
          <img src={item.imageUrl} alt={item.title} className="detail-image" />
          <div className="detail-status-badge">
            <span className={`status ${item.status}`}>{item.status === 'lost' ? '🔴 LOST' : '🟢 FOUND'}</span>
          </div>
        </div>

        <div className="detail-content">
          <h1 className="detail-title">{item.title}</h1>
          
          <div className="detail-description">
            <h3>Description</h3>
            <p>{item.description}</p>
          </div>

          <div className="detail-info">
            <div className="info-card">📍 <strong>Location:</strong> {item.location}</div>
            <div className="info-card">📞 <strong>Contact:</strong> {item.phoneNumber}</div>
            <div className="info-card">📅 <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</div>
            <div className="info-card">🆔 <strong>Report ID:</strong> #{item.id}</div>
          </div>

          <div className="detail-actions">
            <button className="call-btn" onClick={() => window.location.href = `tel:${item.phoneNumber}`}>📞 Call Now</button>
            <button className="report-btn" onClick={() => navigate('/add-item')}>📝 Report Similar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;