// Get the API URL based on environment
const getApiUrl = () => {
  // In production (deployed on Railway/Netlify)
  if (window.location.hostname !== 'localhost') {
    // Replace with your Railway backend URL after deployment
    return 'https://your-backend-url.up.railway.app/api/items';
  }
  // In development (local)
  return 'http://localhost:5000/api/items';
};

const API_URL = getApiUrl();

console.log('API_URL:', API_URL);

// Get all items
export const getAllItems = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch items');
    return await response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
};

// Get items by status
export const getItemsByStatus = async (status) => {
  try {
    const response = await fetch(`${API_URL}/status/${status}`);
    if (!response.ok) throw new Error('Failed to fetch items');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${status} items:`, error);
    return [];
  }
};

// Get single item
export const getItemById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch item');
    return await response.json();
  } catch (error) {
    console.error('Error fetching item:', error);
    return null;
  }
};

// Create new item
export const createItem = async (itemData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) throw new Error('Failed to create item');
    return await response.json();
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

// Delete item
export const deleteItem = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete item');
    return await response.json();
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};