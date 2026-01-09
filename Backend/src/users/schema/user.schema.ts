/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
      minlength: [3, 'min length is 3'],
      maxlength: [30, 'max length is 30'],
    },
    password: {
      type: String,
      minlength: [3, 'min length is 3'],
      maxlength: [30, 'max length is 30'],
      select: false,
    },
    email: {
      type: String,
      minlength: [3, 'min length is 30'],
      maxlength: [30, 'max length is 30'],
      required: [true, 'email is required'],
      unique: [true, 'email is unique'],
    },
    role: {
      type: String,
      enum: ['Admin', 'User'],
      default: 'User',
    },
    avatar: {
      type: String,
    },
    age: {
      type: Number,
    },
    phone_number: {
      type: String,
    },
    address: String,
    active: {
      type: Boolean,
      default: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    verification_Code: { type: String, select: false },
    codeExpiresAt: { type: Date, select: false },
    provider: String,
    providerId: String,
  },
  { timestamps: true },
);
UserSchema.pre('save', async function () {
  const user = this as any;
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(user.password, salt);
});

UserSchema.pre(/^find/, function (this: mongoose.Query<any, any>) {
  this.where({ active: true });
});