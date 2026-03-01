// TypeScript interfaces for Tools Database

export interface PricingTier {
  name: string;
  price: number;
  period?: string;
  features: string[];
}

export interface Pricing {
  free: boolean;
  tiers: PricingTier[];
}

export interface Tool {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  website: string;
  founded: string;
  type: 'Open-source' | 'Proprietary' | 'Open Core' | 'Freemium';
  description: string;
  pricing: Pricing;
  pros: string[];
  cons: string[];
  apiAvailable: boolean;
  segment: 1 | 2;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  segment: 1 | 2;
}

export interface CategoryMap {
  [key: string]: Category;
}
