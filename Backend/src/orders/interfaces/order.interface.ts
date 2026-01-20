/* eslint-disable prettier/prettier */
import { Document, Types } from 'mongoose';

export interface OrderItem {
  [x: string]: any;
  productId: Types.ObjectId;
  productName: string;
  price: number;
  quantity: number;
}

export interface Order extends Document {
  userId?: Types.ObjectId; // optional for guest checkout
  email: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded';
  stripePaymentIntentId?: string;
  stripeSessionId?: string;
  stripeCustomerId?: string;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
  image: string;
}
