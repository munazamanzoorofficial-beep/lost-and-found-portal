import React, { useState, useEffect } from 'react';
import { getItemsByStatus, deleteItem } from '../services/api';
import ItemCard from '../components/ItemCard';
import './Pages.css';

function Lost() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getItemsByStatus('lost');
      setItems(data);
    } catch (error) {
      console.error('Error fetching lost items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id);
        await fetchItems();
        alert('✅ Item deleted successfully!');
      } catch (error) {
        alert('❌ Error deleting item');
      }
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading lost items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📋 Lost Items</h1>
        <p>{items.length} item(s) reported lost on campus</p>
      </div>
      
      <div className="items-grid">
        {items.map(item => (
          <ItemCard key={item.id} item={item} onDelete={handleDelete} />
        ))}
        {items.length === 0 && (
          <div className="empty-state">
            <p>🔍 No lost items reported yet</p>
            <a href="/add-item" className="btn-primary">📝 Report a Lost Item</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Lost;