const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ============ DATA STORAGE ============
let items = [];
let currentId = 1;

// ============ HELPER FUNCTION FOR IMAGES ============
const getImageUrl = (title) => {
  const lowerTitle = title.toLowerCase();
  
  // Lost items images
  if (lowerTitle.includes('calculator')) return '/images/lost/calculator.png';
  if (lowerTitle.includes('iphone')) return '/images/lost/iphone.png';
  if (lowerTitle.includes('wallet')) return '/images/lost/wallet.png';
  if (lowerTitle.includes('laptop')) return '/images/lost/laptop.png';
  if (lowerTitle.includes('airpods')) return '/images/lost/airpods.png';
  if (lowerTitle.includes('id card')) return '/images/lost/idcard.png';
  if (lowerTitle.includes('sunglasses')) return '/images/lost/sunglasses.png';
  
  // Found items images
  if (lowerTitle.includes('keys')) return '/images/found/keys.png';
  if (lowerTitle.includes('backpack')) return '/images/found/backpack.png';
  if (lowerTitle.includes('water bottle')) return '/images/found/waterbottle.png';
  if (lowerTitle.includes('power bank')) return '/images/found/powerbank.png';
  if (lowerTitle.includes('watch')) return '/images/found/watch.png';
  if (lowerTitle.includes('textbook')) return '/images/found/textbook.png';
  if (lowerTitle.includes('charger')) return '/images/found/charger.png';
  if (lowerTitle.includes('umbrella')) return '/images/found/umbrella.png';
  
  // Default fallback image
  return '/images/default.png';
};

// ============ SAMPLE DATA - LOST ITEMS (7 items) ============
const lostItemsData = [
  {
    title: "Scientific Calculator",
    description: "Casio FX-991EX calculator lost after the Math exam. Name 'Ali' written on back.",
    location: "Examination Hall, Block C",
    phoneNumber: "+92-345-7778899",
    status: "lost",
    date: "2026-04-23"
  },
  {
    title: "iPhone 13 (Black)",
    description: "Black iPhone 13 with a cracked screen protector. Has a red silicon cover.",
    location: "Cafeteria, 2nd Floor",
    phoneNumber: "+92-321-5556677",
    status: "lost",
    date: "2026-04-22"
  },
  {
    title: "Black Leather Wallet",
    description: "Contains student ID (2023-CS-101), bank card, and Rs. 5000 cash.",
    location: "Main Cafeteria, Block A",
    phoneNumber: "+92-300-1234567",
    status: "lost",
    date: "2026-04-20"
  },
  {
    title: "Dell Laptop (Silver)",
    description: "Dell XPS 13 laptop with sticker of NASA on the back. Contains important project files.",
    location: "Computer Science Department, Lab 3",
    phoneNumber: "+92-333-9876543",
    status: "lost",
    date: "2026-04-21"
  },
  {
    title: "Apple AirPods Pro",
    description: "White AirPods Pro in a black protective case. Lost near the parking area.",
    location: "Parking Lot, Near Gate 1",
    phoneNumber: "+92-312-4567890",
    status: "lost",
    date: "2026-04-24"
  },
  {
    title: "Student ID Card",
    description: "PMAS Student ID Card - Name: Sara Ahmed, Registration No: 2022-AG-456",
    location: "Central Library",
    phoneNumber: "+92-344-1122334",
    status: "lost",
    date: "2026-04-19"
  },
  {
    title: "RayBan Sunglasses",
    description: "Black RayBan Wayfarer sunglasses. Lost in the sports complex.",
    location: "Sports Complex, Basketball Court",
    phoneNumber: "+92-333-4455667",
    status: "lost",
    date: "2026-04-18"
  }
];

// ============ SAMPLE DATA - FOUND ITEMS (8 items) ============
const foundItemsData = [
  {
    title: "Set of Keys",
    description: "Found a keychain with 3 keys, a USB drive, and a PMAS keyring.",
    location: "Parking Lot, Near Gate 2",
    phoneNumber: "+92-333-4445566",
    status: "found",
    date: "2026-04-23"
  },
  {
    title: "Blue Backpack",
    description: "Found a blue Outhorn backpack with notebooks and a water bottle inside.",
    location: "Central Library, Entrance Gate",
    phoneNumber: "+92-311-9876543",
    status: "found",
    date: "2026-04-21"
  },
  {
    title: "Water Bottle",
    description: "Found a blue Hydro Flask water bottle in the cafeteria.",
    location: "Main Cafeteria, Block A",
    phoneNumber: "+92-300-9988776",
    status: "found",
    date: "2026-04-24"
  },
  {
    title: "Power Bank",
    description: "Found a black 20000mAh power bank near the examination hall.",
    location: "Examination Hall, Block C",
    phoneNumber: "+92-345-6677889",
    status: "found",
    date: "2026-04-22"
  },
  {
    title: "Silver Watch",
    description: "Found a silver analog watch with leather strap. Looks expensive.",
    location: "Agriculture Faculty, Ground Floor",
    phoneNumber: "+92-321-5544332",
    status: "found",
    date: "2026-04-20"
  },
  {
    title: "Physics Textbook",
    description: "Found 'University Physics' textbook with notes inside. Name: Hassan Raza",
    location: "Library, Reading Area",
    phoneNumber: "+92-333-2233445",
    status: "found",
    date: "2026-04-19"
  },
  {
    title: "Mobile Charger",
    description: "Found a white Samsung fast charger with USB-C cable.",
    location: "Computer Lab, 2nd Floor",
    phoneNumber: "+92-344-9988776",
    status: "found",
    date: "2026-04-24"
  },
  {
    title: "Umbrella (Black)",
    description: "Found a black folding umbrella near the parking lot.",
    location: "Parking Lot, Near Gate 3",
    phoneNumber: "+92-312-5566778",
    status: "found",
    date: "2026-04-18"
  }
];

// ============ LOAD ALL ITEMS INTO MEMORY ============
console.log('Loading sample data...');

lostItemsData.forEach(item => {
  items.push({
    id: currentId++,
    ...item,
    imageUrl: getImageUrl(item.title),
    createdAt: new Date()
  });
});

foundItemsData.forEach(item => {
  items.push({
    id: currentId++,
    ...item,
    imageUrl: getImageUrl(item.title),
    createdAt: new Date()
  });
});

console.log(`✅ Loaded ${items.length} items (${lostItemsData.length} lost, ${foundItemsData.length} found)`);

// ============ API ROUTES ============

// GET all items
app.get('/api/items', (req, res) => {
  console.log(`📦 GET /api/items - Returning ${items.length} items`);
  res.json(items);
});

// GET items by status (lost/found)
app.get('/api/items/status/:status', (req, res) => {
  const { status } = req.params;
  const filtered = items.filter(item => item.status === status);
  console.log(`📦 GET /api/items/status/${status} - Returning ${filtered.length} items`);
  res.json(filtered);
});

// GET single item by ID
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  console.log(`📦 GET /api/items/${id} - Found: ${item.title}`);
  res.json(item);
});

// POST create new item
app.post('/api/items', (req, res) => {
  const { title, description, location, phoneNumber, status, date, imageUrl } = req.body;
  
  // Validate required fields
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
    imageUrl: imageUrl || getImageUrl(title),
    createdAt: new Date()
  };
  
  items.push(newItem);
  console.log(`✅ POST /api/items - Created new item: ${newItem.title} (ID: ${newItem.id})`);
  res.status(201).json(newItem);
});

// UPDATE item
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  
  items[index] = { ...items[index], ...req.body };
  console.log(`✏️ PUT /api/items/${id} - Updated: ${items[index].title}`);
  res.json(items[index]);
});

// DELETE item
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  
  const deletedItem = items[index];
  items.splice(index, 1);
  console.log(`🗑️ DELETE /api/items/${id} - Deleted: ${deletedItem.title}`);
  res.json({ message: 'Item deleted successfully' });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    itemsCount: items.length,
    lostCount: items.filter(i => i.status === 'lost').length,
    foundCount: items.filter(i => i.status === 'found').length
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Lost & Found API is running!',
    version: '1.0.0',
    endpoints: {
      allItems: '/api/items',
      lostItems: '/api/items/status/lost',
      foundItems: '/api/items/status/found',
      singleItem: '/api/items/:id',
      health: '/api/health'
    }
  });
});

// ============ START SERVER ============
const PORT = 5001;
app.listen(PORT, () => {
  console.log('\n=================================');
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Total items: ${items.length}`);
  console.log(`🔴 Lost items: ${items.filter(i => i.status === 'lost').length}`);
  console.log(`🟢 Found items: ${items.filter(i => i.status === 'found').length}`);
  console.log('=================================\n');
  console.log(`📡 Test API: http://localhost:${PORT}/api/items`);
  console.log(`❤️  Health check: http://localhost:${PORT}/api/health\n`);
});