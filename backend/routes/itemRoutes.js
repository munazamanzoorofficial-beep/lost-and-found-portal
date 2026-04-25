const express = require('express');
const router = express.Router();

// In-memory storage
let items = [];
let currentId = 1;

// Online image URLs (these work everywhere)
const getImageForItem = (title) => {
  const lowerTitle = title.toLowerCase();
  
  // Lost items images
  if (lowerTitle.includes('calculator')) return 'https://images.unsplash.com/photo-1587145823261-e7d0b7ae7a9c?w=300';
  if (lowerTitle.includes('iphone')) return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300';
  if (lowerTitle.includes('wallet')) return 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300';
  if (lowerTitle.includes('laptop')) return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300';
  if (lowerTitle.includes('airpods')) return 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300';
  if (lowerTitle.includes('id card')) return 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300';
  if (lowerTitle.includes('sunglasses')) return 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300';
  
  // Found items images
  if (lowerTitle.includes('keys')) return 'https://images.unsplash.com/photo-1585504193795-d06a9371ff36?w=300';
  if (lowerTitle.includes('backpack')) return 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300';
  if (lowerTitle.includes('water bottle')) return 'https://images.unsplash.com/photo-1602143408250-f0d4dd7df3c1?w=300';
  if (lowerTitle.includes('power bank')) return 'https://images.unsplash.com/photo-1609592424307-01f9b1e2b19e?w=300';
  if (lowerTitle.includes('watch')) return 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300';
  if (lowerTitle.includes('textbook')) return 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300';
  if (lowerTitle.includes('charger')) return 'https://images.unsplash.com/photo-1586656577809-65c3ebced2f5?w=300';
  if (lowerTitle.includes('umbrella')) return 'https://images.unsplash.com/photo-1558431382-27e3031c8052?w=300';
  
  // Default fallback image
  return 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=300';
};

// Lost Items (7 items)
const lostItems = [
  { title: "Scientific Calculator", description: "Casio FX-991EX calculator lost after the Math exam. Name 'Ali' written on back.", location: "Examination Hall, Block C", phoneNumber: "+92-345-7778899", status: "lost", date: "2026-04-23" },
  { title: "iPhone 13 (Black)", description: "Black iPhone 13 with a cracked screen protector. Has a red silicon cover.", location: "Cafeteria, 2nd Floor", phoneNumber: "+92-321-5556677", status: "lost", date: "2026-04-22" },
  { title: "Black Leather Wallet", description: "Contains student ID (2023-CS-101), bank card, and Rs. 5000 cash.", location: "Main Cafeteria, Block A", phoneNumber: "+92-300-1234567", status: "lost", date: "2026-04-20" },
  { title: "Dell Laptop (Silver)", description: "Dell XPS 13 laptop with sticker of NASA on the back.", location: "Computer Science Department, Lab 3", phoneNumber: "+92-333-9876543", status: "lost", date: "2026-04-21" },
  { title: "Apple AirPods Pro", description: "White AirPods Pro in a black protective case.", location: "Parking Lot, Near Gate 1", phoneNumber: "+92-312-4567890", status: "lost", date: "2026-04-24" },
  { title: "Student ID Card", description: "PMAS Student ID Card - Name: Sara Ahmed, Registration: 2022-AG-456", location: "Central Library", phoneNumber: "+92-344-1122334", status: "lost", date: "2026-04-19" },
  { title: "RayBan Sunglasses", description: "Black RayBan Wayfarer sunglasses. Lost in the sports complex.", location: "Sports Complex", phoneNumber: "+92-333-4455667", status: "lost", date: "2026-04-18" }
];

// Found Items (8 items)
const foundItems = [
  { title: "Set of Keys", description: "Keychain with 3 keys, USB drive, and PMAS keyring.", location: "Parking Lot, Near Gate 2", phoneNumber: "+92-333-4445566", status: "found", date: "2026-04-23" },
  { title: "Blue Backpack", description: "Blue Outhorn backpack with notebooks and water bottle.", location: "Central Library", phoneNumber: "+92-311-9876543", status: "found", date: "2026-04-21" },
  { title: "Water Bottle", description: "Blue Hydro Flask water bottle in cafeteria.", location: "Main Cafeteria", phoneNumber: "+92-300-9988776", status: "found", date: "2026-04-24" },
  { title: "Power Bank", description: "Black 20000mAh power bank near examination hall.", location: "Examination Hall", phoneNumber: "+92-345-6677889", status: "found", date: "2026-04-22" },
  { title: "Silver Watch", description: "Silver analog watch with leather strap.", location: "Agriculture Faculty", phoneNumber: "+92-321-5544332", status: "found", date: "2026-04-20" },
  { title: "Physics Textbook", description: "University Physics textbook with notes. Name: Hassan Raza", location: "Library", phoneNumber: "+92-333-2233445", status: "found", date: "2026-04-19" },
  { title: "Mobile Charger", description: "White Samsung fast charger with USB-C cable.", location: "Computer Lab", phoneNumber: "+92-344-9988776", status: "found", date: "2026-04-24" },
  { title: "Umbrella (Black)", description: "Black folding umbrella near parking lot.", location: "Parking Lot", phoneNumber: "+92-312-5566778", status: "found", date: "2026-04-18" }
];

// Add all items with proper IDs and images
lostItems.forEach(item => {
  items.push({
    id: currentId++,
    ...item,
    imageUrl: getImageForItem(item.title),
    createdAt: new Date(item.date)
  });
});

foundItems.forEach(item => {
  items.push({
    id: currentId++,
    ...item,
    imageUrl: getImageForItem(item.title),
    createdAt: new Date(item.date)
  });
});

console.log(`Loaded ${items.length} items (${lostItems.length} lost, ${foundItems.length} found)`);

// GET all items
router.get('/', (req, res) => {
  console.log('GET /api/items - Returning', items.length, 'items');
  res.json(items);
});

// GET items by status
router.get('/status/:status', (req, res) => {
  const { status } = req.params;
  const filtered = items.filter(item => item.status === status);
  console.log(`GET /api/items/status/${status} - Returning`, filtered.length, 'items');
  res.json(filtered);
});

// GET single item
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
});

// POST create item
router.post('/', (req, res) => {
  const { title, description, location, phoneNumber, status, date, imageUrl } = req.body;
  
  if (!title || !description || !location || !phoneNumber || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  const newItem = {
    id: currentId++,
    title,
    description,
    location,
    phoneNumber,
    status,
    date: date || new Date().toISOString().split('T')[0],
    imageUrl: imageUrl || getImageForItem(title),
    createdAt: new Date()
  };
  
  items.push(newItem);
  console.log('POST /api/items - Created:', newItem.title);
  res.status(201).json(newItem);
});

// DELETE item
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  
  items.splice(index, 1);
  console.log('DELETE /api/items - Deleted:', id);
  res.json({ message: 'Item deleted successfully' });
});

module.exports = router;