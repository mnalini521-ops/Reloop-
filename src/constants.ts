import { FAQ, LeaderboardUser, Product, User } from "./types";

export const MOCK_USER: User = {
  id: "user-1",
  name: "Eco Hero",
  email: "mnalini521@gmail.com",
  points: 4450,
  level: 4,
  impact: {
    wastePrevented: 125,
    metalsRecovered: 45,
    treesSaved: 12,
  },
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "iPhone 13 Pro",
    brand: "Apple",
    model: "13 Pro",
    category: "phone",
    basePrice: 450,
    condition: "good",
    image: "https://picsum.photos/seed/iphone/400/400",
  },
  {
    id: "p2",
    name: "MacBook Air M2",
    brand: "Apple",
    model: "M2",
    category: "laptop",
    basePrice: 850,
    condition: "new",
    image: "https://picsum.photos/seed/macbook/400/400",
  },
  {
    id: "p3",
    name: "Pixel 7 Pro",
    brand: "Google",
    model: "7 Pro",
    category: "phone",
    basePrice: 380,
    condition: "fair",
    image: "https://picsum.photos/seed/pixel/400/400",
  },
];

export const FAQS: FAQ[] = [
  {
    q: "How does ReLoop AI detect device condition?",
    a: "Our advanced AI models analyze images of your device to detect scratches, dents, and screen damage, providing an instant and accurate valuation.",
  },
  {
    q: "What happens to my recycled e-waste?",
    a: "We partner with certified recyclers who extract precious metals and safely dispose of toxic components, ensuring zero landfill waste.",
  },
  {
    q: "How do I earn reward points?",
    a: "You earn points for every device you recycle, exchange, or sell. These points can be redeemed for discounts or donated to environmental causes.",
  },
];

export const LEADERBOARD: LeaderboardUser[] = [
  { id: "1", name: "Green Warrior", points: 12500, rank: 1, avatar: "https://picsum.photos/seed/user1/100/100" },
  { id: "2", name: "Eco Champion", points: 11200, rank: 2, avatar: "https://picsum.photos/seed/user2/100/100" },
  { id: "3", name: "Earth Saver", points: 9800, rank: 3, avatar: "https://picsum.photos/seed/user3/100/100" },
  { id: "4", name: "Recycle King", points: 8500, rank: 4, avatar: "https://picsum.photos/seed/user4/100/100" },
  { id: "5", name: "Nature Lover", points: 7200, rank: 5, avatar: "https://picsum.photos/seed/user5/100/100" },
];
