/* eslint-disable prettier/prettier */

import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
export const OrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: Types.ObjectId,
      ref: 'Food',
      required: true,
    },
    productName: {
      type: String,
      required: true, // snapshot
    },
    price: {
      type: Number, // بالسنت
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false },
);
export const OrderSchema = new mongoose.Schema(
  {
    // User
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: false, // guest checkout
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    // Money
    amount: {
      type: Number, // total (cents)
      required: true,
    },
    currency: {
      type: String,
      default: 'usd',
    },

    // Status
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'cancelled', 'refunded'],
      default: 'pending',
    },

    // Stripe
    stripePaymentIntentId: String,
    stripeSessionId: String,
    stripeCustomerId: String,

    // Items
    items: {
      type: [OrderItemSchema],
      required: true,
    },

  },
  { timestamps: true },
);
