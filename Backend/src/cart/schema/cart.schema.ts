/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, 
    },

    items: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: { //لي حطيت برايس عشان لو غيرت السعر للمنتج يبقي حافظ السعر القديم الليب حاطه في الكارت
          type: Number,
          required: true,
        },
      },
    ],

    totalPrice: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ['active', 'ordered'],
      default: 'active',
    },
  },
  { timestamps: true },
);
CartSchema.index({ user: 1, status: 1 });
