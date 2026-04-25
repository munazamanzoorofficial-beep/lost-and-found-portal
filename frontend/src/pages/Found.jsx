import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItemsByStatusAPI, deleteItemAPI } from '../services/api';
import './Pages.css';

function Found() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    const data = await getItemsByStatusAPI('found');
    setItems(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteItemAPI(id);
      await loadItems();
      alert('✅ Item deleted successfully!');
    }
  };

  const handleImageError = (e) => {
    e.target.src = '/images/default.png';
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading found items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🔍 Found Items</h1>
        <p>{items.length} item(s) found and reported on campus</p>
      </div>
      
      <div className="items-grid">
        {items.map(item => (
          <div key={item.id} className="item-card" onClick={() => navigate(`/item/${item.id}`)}>
            <div className="card-image">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                onError={handleImageError}
              />
              <span className="status-badge found">
                🟢 FOUND
              </span>
            </div>
            <div className="card-content">
              <h3>{item.title}</h3>
              <p className="description">
                {item.description.length > 100 
                  ? item.description.substring(0, 100) + '...' 
                  : item.description}
              </p>
              <div className="info-item">
                <span className="info-icon">📍</span>
                <span>{item.location}</span>
              </div>
              <div className="info-item">
                <span className="info-icon">📞</span>
                <span>{item.phoneNumber}</span>
              </div>
              <div className="info-item">
                <span className="info-icon">📅</span>
                <span>{new Date(item.date).toLocaleDateString()}</span>
              </div>
              <button 
                className="delete-btn" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  handleDelete(item.id); 
                }}
              >
                🗑️ Delete Item
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="empty-state">
          <p>🎉 No found items reported yet</p>
          <a href="/add-item" className="btn-primary">📝 Report a Found Item</a>
        </div>
      )}
    </div>
  );
}

export default Found;