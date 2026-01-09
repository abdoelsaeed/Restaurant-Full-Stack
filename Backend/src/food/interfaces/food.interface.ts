/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
export interface Food extends Document {
  name: string;
  price: number;
  discount?: number;
  ingredients: string;
  description?: string;
  isFeatured: boolean;
  type: any;
  mealTimes: any;
  image: string;
  createdAt: Date;
  finalPrice?: number;
  updatedAt: Date;
  active?: boolean;
}
