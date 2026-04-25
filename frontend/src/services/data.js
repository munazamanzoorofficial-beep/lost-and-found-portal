// All data stored in browser memory
let items = [];
let currentId = 1;

// Helper function to get local images
// Helper function to get local images
const getLocalImage = (title, status) => {
  const lowerTitle = title.toLowerCase();
  
  // Lost items images
  if (status === 'lost') {
    if (lowerTitle.includes('calculator')) return '/images/lost/calculator.png';
    if (lowerTitle.includes('iphone')) return '/images/lost/iphone.png';
    if (lowerTitle.includes('wallet')) return '/images/lost/wallet.png';
    if (lowerTitle.includes('laptop')) return '/images/lost/laptop.png';
    if (lowerTitle.includes('airpods')) return '/images/lost/airpods.png';
    if (lowerTitle.includes('id card')) return '/images/lost/idcard.png';
    if (lowerTitle.includes('sunglasses')) return '/images/lost/sunglasses.png';
  }
  
  // Found items images
  if (status === 'found') {
    if (lowerTitle.includes('keys')) return '/images/found/keys.png';
    if (lowerTitle.includes('backpack')) return '/images/found/backpack.png';
    if (lowerTitle.includes('water bottle')) return '/images/found/waterbottle.png';
    if (lowerTitle.includes('power bank')) return '/images/found/powerbank.png';
    if (lowerTitle.includes('watch')) return '/images/found/watch.png';
    if (lowerTitle.includes('textbook')) return '/images/found/textbook.png';
    if (lowerTitle.includes('charger')) return '/images/found/charger.png';
    if (lowerTitle.includes('umbrella')) return '/images/found/umbrella.png';
  }
  
  return '/images/default.png';
};

// Sample Lost Items (7 items)
const lostItems = [
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
    description: "Dell XPS 13 laptop with sticker of NASA on the back.",
    location: "Computer Science Department, Lab 3",
    phoneNumber: "+92-333-9876543",
    status: "lost",
    date: "2026-04-21"
  },
  {
    title: "Apple AirPods Pro",
    description: "White AirPods Pro in a black protective case.",
    location: "Parking Lot, Near Gate 1",
    phoneNumber: "+92-312-4567890",
    status: "lost",
    date: "2026-04-24"
  },
  {
    title: "Student ID Card",
    description: "PMAS Student ID Card - Name: Sara Ahmed, Registration: 2022-AG-456",
    location: "Central Library",
    phoneNumber: "+92-344-1122334",
    status: "lost",
    date: "2026-04-19"
  },
  {
    title: "RayBan Sunglasses",
    description: "Black RayBan Wayfarer sunglasses. Lost in the sports complex.",
    location: "Sports Complex",
    phoneNumber: "+92-333-4455667",
    status: "lost",
    date: "2026-04-18"
  }
];

// Sample Found Items (8 items)
const foundItems = [
  {
    title: "Set of Keys",
    description: "Keychain with 3 keys, USB drive, and PMAS keyring.",
    location: "Parking Lot, Near Gate 2",
    phoneNumber: "+92-333-4445566",
    status: "found",
    date: "2026-04-23"
  },
  {
    title: "Blue Backpack",
    description: "Blue Outhorn backpack with notebooks and water bottle.",
    location: "Central Library",
    phoneNumber: "+92-311-9876543",
    status: "found",
    date: "2026-04-21"
  },
  {
    title: "Water Bottle",
    description: "Blue Hydro Flask water bottle in cafeteria.",
    location: "Main Cafeteria",
    phoneNumber: "+92-300-9988776",
    status: "found",
    date: "2026-04-24"
  },
  {
    title: "Power Bank",
    description: "Black 20000mAh power bank near examination hall.",
    location: "Examination Hall",
    phoneNumber: "+92-345-6677889",
    status: "found",
    date: "2026-04-22"
  },
  {
    title: "Silver Watch",
    description: "Silver analog watch with leather strap.",
    location: "Agriculture Faculty",
    phoneNumber: "+92-321-5544332",
    status: "found",
    date: "2026-04-20"
  },
  {
    title: "Physics Textbook",
    description: "University Physics textbook with notes. Name: Hassan Raza",
    location: "Library",
    phoneNumber: "+92-333-2233445",
    status: "found",
    date: "2026-04-19"
  },
  {
    title: "Mobile Charger",
    description: "White Samsung fast charger with USB-C cable.",
    location: "Computer Lab",
    phoneNumber: "+92-344-9988776",
    status: "found",
    date: "2026-04-24"
  },
  {
    title: "Umbrella (Black)",
    description: "Black folding umbrella near parking lot.",
    location: "Parking Lot",
    phoneNumber: "+92-312-5566778",
    status: "found",
    date: "2026-04-18"
  }
];

// Initialize items with local images
lostItems.forEach(item => {
  items.push({ 
    id: currentId++, 
    ...item, 
    imageUrl: getLocalImage(item.title, 'lost'),
    createdAt: new Date() 
  });
});

foundItems.forEach(item => {
  items.push({ 
    id: currentId++, 
    ...item, 
    imageUrl: getLocalImage(item.title, 'found'),
    createdAt: new Date() 
  });
});

console.log(`✅ Loaded ${items.length} items (${lostItems.length} lost, ${foundItems.length} found)`);

// Export functions
export const getAllItems = () => {
  return [...items];
};

export const getItemsByStatus = (status) => {
  return items.filter(item => item.status === status);
};

export const getItemById = (id) => {
  return items.find(item => item.id === parseInt(id));
};

export const createItem = (itemData) => {
  const newItem = {
    id: currentId++,
    ...itemData,
    createdAt: new Date()
  };
  items.push(newItem);
  console.log('✅ Created new item:', newItem.title);
  return newItem;
};

export const deleteItem = (id) => {
  const index = items.findIndex(item => item.id === parseInt(id));
  if (index !== -1) {
    const deleted = items[index];
    items.splice(index, 1);
    console.log('🗑️ Deleted item:', deleted.title);
    return true;
  }
  return false;
};