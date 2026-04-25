import React, { useState, useEffect } from 'react';
import { getItemsByStatus, deleteItem } from '../services/api';
import ItemCard from '../components/ItemCard';

function Found() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getItemsByStatus('found');
      setItems(data);
      if (data.length === 0) {
        setError('Unable to load found items. Please refresh the page.');
      }
    } catch (error) {
      console.error('Error loading found items:', error);
      setError('Unable to load found items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    await loadItems();
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {error && (
        <div style={{ marginBottom: '20px', color: '#b00020' }}>
          <p>{error}</p>
          <button onClick={loadItems}>Refresh</button>
        </div>
      )}
      <h1>Found Items</h1>
      <p>{items.length} items reported found</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {items.map(item => (
          <ItemCard key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </div>
      {items.length === 0 && <p>No found items found.</p>}
    </div>
  );
}

export default Found;