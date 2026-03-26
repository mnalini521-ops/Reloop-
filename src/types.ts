export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  level: number;
  impact: {
    wastePrevented: number; // in kg
    metalsRecovered: number; // in g
    treesSaved: number;
  };
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: 'phone' | 'laptop' | 'tablet' | 'other';
  basePrice: number;
  condition: 'new' | 'good' | 'fair' | 'poor';
  image?: string;
}

export interface Activity {
  id: string;
  type: 'recycle' | 'exchange' | 'sell' | 'donate';
  title: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  points?: number;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  points: number;
  rank: number;
  avatar?: string;
}
