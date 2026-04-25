import React, { useState, useEffect } from 'react';
import { getItemsByStatus, deleteItem } from '../services/api';
import ItemCard from '../components/ItemCard';

function Lost() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    const data = await getItemsByStatus('lost');
    setItems(data);
    setLoading(false);
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
      <h1>Lost Items</h1>
      <p>{items.length} items reported lost</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {items.map(item => (
          <ItemCard key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </div>
      {items.length === 0 && <p>No lost items found.</p>}
    </div>
  );
}

export default Lost;