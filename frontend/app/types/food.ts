export interface Food {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  finalPrice: number;
  ingredients: string[];
  description?: string;
  type?: string;
  mealTimes?: string[];
  isFeatured: boolean;
  image: string;
  ordersCount?: number;
  active?: boolean;
  isWishlisted?:boolean;
  createdAt: string;
  updatedAt: string;
}
export interface HomeFood {
  _id: string;
  name: string;
  price: number;
  discount: number;
  finalPrice: number;
  image: string;
}
export interface HomeData {
  populars: HomeFood[];
  featured: HomeFood[];
  offers: HomeFood[];
}