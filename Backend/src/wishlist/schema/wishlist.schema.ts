/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const WishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
      required: [true, 'Food is required'],
    },
  },
  {
    timestamps: true,
    collection: 'wishlists',
  },
);

// Ensure unique combination of user and food
WishlistSchema.index({ user: 1, food: 1 }, { unique: true });

// Pre-find middleware to populate user and food
WishlistSchema.pre(/^find/, function (this: mongoose.Query<any, any>) {
  this.populate('user', 'name email').populate(
    'food',
    'name price image finalPrice discount',
  );
});