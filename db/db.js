export const user_array = [
  { username: "admin", email: "lankaice1@gmail.com", password: "1234" },
  { username: "kalana", email: "kalanamethsara53@gmail.com", password: "2770" }
];
// export const customer_array = []
export const customer_array = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+94 77 258 8618",
    joinDate: "2023-01-15"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+94 77 258 8618",
    joinDate: "2023-01-15"
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "+94 77 258 8618",
    joinDate: "2023-01-15"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+94 77 258 8618",
    joinDate: "2023-01-15"
  },
  {
    id: 5,
    name: "Robert Brown",
    email: "robert.brown@example.com",
    phone: "+94 77 258 8618",
    joinDate: "2023-01-15"
  }
];

// export const item_array = []

export const item_array = [
  {
    id: 1,
    name: "Apple",
    category: "Fruits",
    price: 120,
    stock: 120,
    unit: "kg",
  },
  {
    id: 2,
    name: "Banana",
    category: "Fruits",
    price: 80,
    stock: 90,
    unit: "kg",
  },
  {
    id: 3,
    name: "Milk 1L",
    category: "Dairy",
    price: 800,
    stock: 60,
    unit: "bottle",
  },
  {
    id: 4,
    name: "Bread Loaf",
    category: "Bakery",
    price: 90,
    stock: 40,
    unit: "pack",
  },
  {
    id: 5,
    name: "Eggs (12 pcs)",
    category: "Dairy",
    price: 35,
    stock: 75,
    unit: "carton",
  },
  {
    id: 6,
    name: "Chicken Breast",
    category: "Meat",
    price: 890,
    stock: 35,
    unit: "kg",
  },
  {
    id: 7,
    name: "Rice 5kg",
    category: "Grains",
    price: 650,
    stock: 50,
    unit: "bag",
  },
  {
    id: 8,
    name: "Cooking Oil 1L",
    category: "Pantry",
    price: 420,
    stock: 45,
    unit: "bottle",
  },
  {
    id: 9,
    name: "Sugar 1kg",
    category: "Pantry",
    price: 210,
    stock: 80,
    unit: "pack",
  },
  {
    id: 10,
    name: "Salt 1kg",
    category: "Pantry",
    price: 150,
    stock: 100,
    unit: "pack",
  },
];

// export const order_array = []
export const order_array = [
  {
    id: 1,
    customerId: 1,
    customerName: "John Doe",
    items: [
      { itemId: 1, name: "Apple", quantity: 2, price: 120 },
      { itemId: 2, name: "Banana", quantity: 1, price: 80 }
    ],
    totalAmount: 320,
    orderDate: "2025-10-20",
    status: "Completed"
  },
  {
    id: 2,
    customerId: 2,
    customerName: "Jane Smith",
    items: [
      { itemId: 3, name: "Milk 1L", quantity: 2, price: 800 },
      { itemId: 4, name: "Bread Loaf", quantity: 1, price: 90 }
    ],
    totalAmount: 1690,
    orderDate: "2025-10-22",
    status: "Completed"
  },
  {
    id: 3,
    customerId: 3,
    customerName: "Michael Johnson",
    items: [
      { itemId: 6, name: "Chicken Breast", quantity: 1, price: 890 },
      { itemId: 9, name: "Sugar 1kg", quantity: 2, price: 210 }
    ],
    totalAmount: 1310,
    orderDate: "2025-10-25",
    status: "Pending"
  },
  {
    id: 4,
    customerId: 4,
    customerName: "Emily Davis",
    items: [
      { itemId: 7, name: "Rice 5kg", quantity: 1, price: 650 },
      { itemId: 8, name: "Cooking Oil 1L", quantity: 2, price: 420 }
    ],
    totalAmount: 1490,
    orderDate: "2025-10-26",
    status: "Completed"
  },
  {
    id: 5,
    customerId: 5,
    customerName: "Robert Brown",
    items: [
      { itemId: 10, name: "Salt 1kg", quantity: 3, price: 150 },
      { itemId: 5, name: "Eggs (12 pcs)", quantity: 1, price: 35 }
    ],
    totalAmount: 485,
    orderDate: "2025-10-28",
    status: "Cancelled"
  }
];

// export const order_array = [
//   {
//     orderId: "O001",
//     date: "",
//     customerId: "",
//     orderDetails: [{}, {}]
//   }
// ]
