/* eslint-disable prettier/prettier */
import { Document, Types } from 'mongoose';

export interface Wishlist extends Document {
  user: Types.ObjectId;
  food: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
