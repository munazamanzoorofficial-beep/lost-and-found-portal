// Make sure this port matches your backend port
const API_URL = 'http://localhost:5001/api/items';

console.log('API URL:', API_URL);

export const getAllItems = async () => {
  try {
    const response = await fetch(API_URL);
    console.log('Response status:', response.status);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    console.log('Items fetched:', data.length);
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};

export const getItemsByStatus = async (status) => {
  try {
    const response = await fetch(`${API_URL}/status/${status}`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    console.log(`${status} items:`, data.length);
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};

export const getItemById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
};

export const createItem = async (itemData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData),
    });
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};