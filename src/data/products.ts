export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  rating: number;
  reviews: number;
  weight: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 40,
    originalPrice: 50,
    discount: 20,
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300&h=300&fit=crop",
    rating: 4.5,
    reviews: 120,
    weight: "500g",
    inStock: true
  },
  {
    id: 2,
    name: "Amul Fresh Milk",
    category: "Dairy",
    price: 62,
    originalPrice: 65,
    discount: 5,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 245,
    weight: "1L",
    inStock: true
  },
  {
    id: 3,
    name: "Britannia Bread",
    category: "Bakery",
    price: 40,
    originalPrice: 45,
    discount: 11,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop",
    rating: 4.3,
    reviews: 89,
    weight: "400g",
    inStock: true
  },
  {
    id: 4,
    name: "Fresh Bananas",
    category: "Fruits",
    price: 50,
    originalPrice: 60,
    discount: 17,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 156,
    weight: "1kg",
    inStock: true
  },
  {
    id: 5,
    name: "Lays Chips",
    category: "Snacks",
    price: 20,
    originalPrice: 25,
    discount: 20,
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop",
    rating: 4.4,
    reviews: 203,
    weight: "50g",
    inStock: true
  },
  {
    id: 6,
    name: "Fresh Carrots",
    category: "Vegetables",
    price: 35,
    originalPrice: 40,
    discount: 13,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=300&fit=crop",
    rating: 4.5,
    reviews: 98,
    weight: "500g",
    inStock: true
  },
  {
    id: 7,
    name: "Red Apples",
    category: "Fruits",
    price: 120,
    originalPrice: 150,
    discount: 20,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 178,
    weight: "1kg",
    inStock: true
  },
  {
    id: 8,
    name: "Mother Dairy Curd",
    category: "Dairy",
    price: 28,
    originalPrice: 30,
    discount: 7,
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 134,
    weight: "400g",
    inStock: true
  },
  {
    id: 9,
    name: "Coca Cola",
    category: "Beverages",
    price: 40,
    originalPrice: 45,
    discount: 11,
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&h=300&fit=crop",
    rating: 4.5,
    reviews: 267,
    weight: "750ml",
    inStock: true
  },
  {
    id: 10,
    name: "Fresh Onions",
    category: "Vegetables",
    price: 30,
    originalPrice: 35,
    discount: 14,
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&h=300&fit=crop",
    rating: 4.3,
    reviews: 87,
    weight: "1kg",
    inStock: true
  },
  {
    id: 11,
    name: "Parle-G Biscuits",
    category: "Snacks",
    price: 10,
    originalPrice: 12,
    discount: 17,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 412,
    weight: "100g",
    inStock: true
  },
  {
    id: 12,
    name: "Fresh Spinach",
    category: "Vegetables",
    price: 25,
    originalPrice: 30,
    discount: 17,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop",
    rating: 4.4,
    reviews: 76,
    weight: "250g",
    inStock: true
  },
  {
    id: 13,
    name: "Green Grapes",
    category: "Fruits",
    price: 80,
    originalPrice: 100,
    discount: 20,
    image: "https://images.unsplash.com/photo-1599819177626-c0347d3bfef8?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 142,
    weight: "500g",
    inStock: true
  },
  {
    id: 14,
    name: "Amul Butter",
    category: "Dairy",
    price: 50,
    originalPrice: 55,
    discount: 9,
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&h=300&fit=crop",
    rating: 4.9,
    reviews: 321,
    weight: "100g",
    inStock: true
  },
  {
    id: 15,
    name: "Mineral Water",
    category: "Beverages",
    price: 20,
    originalPrice: 20,
    discount: 0,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=300&fit=crop",
    rating: 4.5,
    reviews: 189,
    weight: "1L",
    inStock: true
  },
  {
    id: 16,
    name: "Fresh Potatoes",
    category: "Vegetables",
    price: 25,
    originalPrice: 30,
    discount: 17,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=300&fit=crop",
    rating: 4.4,
    reviews: 156,
    weight: "1kg",
    inStock: true
  },
  {
    id: 17,
    name: "Oranges",
    category: "Fruits",
    price: 90,
    originalPrice: 110,
    discount: 18,
    image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=300&h=300&fit=crop",
    rating: 4.5,
    reviews: 98,
    weight: "1kg",
    inStock: true
  },
  {
    id: 18,
    name: "Maggi Noodles",
    category: "Snacks",
    price: 14,
    originalPrice: 15,
    discount: 7,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 567,
    weight: "70g",
    inStock: true
  },
  {
    id: 19,
    name: "Fresh Capsicum",
    category: "Vegetables",
    price: 60,
    originalPrice: 70,
    discount: 14,
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&h=300&fit=crop",
    rating: 4.3,
    reviews: 67,
    weight: "500g",
    inStock: true
  },
  {
    id: 20,
    name: "Amul Cheese Slice",
    category: "Dairy",
    price: 120,
    originalPrice: 130,
    discount: 8,
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 234,
    weight: "200g",
    inStock: true
  }
];

export const categories = [
  { name: "Fruits & Vegetables", count: 12, icon: "🥕" },
  { name: "Dairy & Bakery", count: 8, icon: "🥛" },
  { name: "Snacks & Beverages", count: 15, icon: "🍿" },
  { name: "Personal Care", count: 10, icon: "🧴" },
];
