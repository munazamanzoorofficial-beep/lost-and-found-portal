import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ItemCard.css';

function ItemCard({ item, onDelete }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/item/${item.id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Delete this item?')) {
      onDelete(item.id);
    }
  };

  const handleImageError = (e) => {
    e.target.src = '/images/default.png';
  };

  return (
    <div className="item-card" onClick={handleClick}>
      <div className="card-image">
        <img src={item.imageUrl || '/images/default.png'} alt={item.title} onError={handleImageError} />
        <span className={`status-badge ${item.status}`}>
          {item.status === 'lost' ? 'LOST' : 'FOUND'}
        </span>
      </div>
      <div className="card-content">
        <h3>{item.title}</h3>
        <p className="description">{item.description.substring(0, 100)}...</p>
        <div className="info-item">📍 {item.location}</div>
        <div className="info-item">📞 {item.phoneNumber}</div>
        <div className="info-item">📅 {new Date(item.date).toLocaleDateString()}</div>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default ItemCard;