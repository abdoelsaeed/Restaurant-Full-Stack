/* eslint-disable prettier/prettier */
import { Document, Types } from 'mongoose';

export interface CartItem {
  [x: string]: any;
  foodId: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface Cart extends Document {
  user: Types.ObjectId;
  items: CartItem[];
  totalPrice: number;
  status: 'active' | 'ordered';
}
