/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as mongoose from 'mongoose';
import { Food } from '../interfaces/food.interface';
export const FoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'you must create a name'],
    },
    price: {
      type: Number,
      required: [true, 'you must create a price'],
    },
    description: String,
    discount: {
      type: Number,
      min: [0, 'Discount cannot be negative'],
      validate: {
        validator: function (this: Food, value: number) {
          return value <= this.price;
        },
        message: 'Discount cannot be greater than price',
      },
      default: 0,
    },
    finalPrice: {
      type: Number,
    },
    ingredients: {
      type: [String],
      required: [true, 'you must provide a ingredients'],
      minlength: [
        10,
        'you must provide a ingredients with at least 10 characters',
      ],
      maxlength: [
        200,
        'you must provide a ingredients with at most 100 characters',
      ],
    },
    type: {
      type: String,
      required: true,
      enum: ['burger', 'pizza', 'salad', 'dessert', 'beef', 'chicken', 'meal'],
    },

    mealTimes: {
      type: [String],
      enum: ['breakfast', 'lunch', 'dinner'],
      required: true,
    },
    image: {
      type: String,
      required: [true, 'you must provide an image'],
    },
    ordersCount: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

FoodSchema.index({ active: 1, ordersCount: -1 });
FoodSchema.index({ type: 1, active: 1 });
FoodSchema.index({ mealTimes: 1, active: 1 });
FoodSchema.index({ type: 1, mealTimes: 1, active: 1 });
FoodSchema.index({ isFeatured: 1, active: 1 });
FoodSchema.index({ discount: 1, active: 1 });

FoodSchema.pre('save', function () {
  this.finalPrice = Math.max(this.price - this.discount, 0);
});

FoodSchema.pre('findOneAndUpdate', async function () {
  const update: any = this.getUpdate();
  if (!update) return;

  const price = update.$set?.price ?? update.price;

  const discount = update.$set?.discount ?? update.discount ?? 0;

  if (price !== undefined) {
    update.$set = {
      ...update.$set,
      finalPrice: Math.max(price - discount, 0),
    };
  }
});

// وامتي لاnext امتي تحط

// ✅ صح (اختار واحد)
// ✔ Option 1: Sync + next
// FoodSchema.pre('findOneAndUpdate', function (next) {
//   // logic
//   next();
// });

// ✔ Option 2: Async بدون next (أفضل)
// FoodSchema.pre('findOneAndUpdate', async function () {
//   // logic
// });
