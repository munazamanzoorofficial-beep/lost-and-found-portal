import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllItems } from '../services/api';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getAllItems();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const lostCount = items.filter(item => item.status === 'lost').length;
  const foundCount = items.filter(item => item.status === 'found').length;
  const recentItems = items.slice(0, 6);

  const handleCardClick = (id) => {
    navigate(`/item/${id}`);
  };

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=300';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading items...</p>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>🔍 Lost Something?</h1>
          <h2>We'll Help You Find It.</h2>
          <p>The official Lost & Found portal for PMAS-Arid Agriculture University</p>
          <div className="hero-buttons">
            <a href="/add-item" className="btn-primary">+ Report an Item</a>
            <a href="/lost" className="btn-secondary">Browse Lost Items →</a>
          </div>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-number">{lostCount}</div>
          <div className="stat-label">Items Lost</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔍</div>
          <div className="stat-number">{foundCount}</div>
          <div className="stat-label">Items Found</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-number">{items.length}</div>
          <div className="stat-label">Total Reports</div>
        </div>
      </div>

      <div className="recent-section">
        <div className="section-header">
          <h2>Recently Reported Items</h2>
          <p>Latest lost and found items on campus</p>
        </div>

        <div className="recent-grid">
          {recentItems.map((item) => (
            <div key={item.id} className="recent-card" onClick={() => handleCardClick(item.id)}>
              <div className="recent-image">
                <img src={item.imageUrl} alt={item.title} onError={handleImageError} />
                <span className={`recent-badge ${item.status}`}>
                  {item.status === 'lost' ? 'LOST' : 'FOUND'}
                </span>
              </div>
              <div className="recent-info">
                <h3>{item.title}</h3>
                <p className="recent-description">
                  {item.description.length > 80 ? item.description.substring(0, 80) + '...' : item.description}
                </p>
                <div className="recent-location">📍 {item.location}</div>
                <div className="recent-date">📅 {new Date(item.date).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>

        {recentItems.length === 0 && (
          <div className="empty-recent">
            <p>No items reported yet.</p>
            <a href="/add-item" className="btn-primary">Be the first to report an item</a>
          </div>
        )}
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>Lost or Found Something?</h2>
          <p>Report it now and help reunite people with their belongings</p>
          <a href="/add-item" className="cta-button">Report an Item Now →</a>
        </div>
      </div>
    </div>
  );
}

export default Home;