/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from 'src/users/interfaces/user.interface';
import { Model } from 'mongoose';
import { Food } from 'src/food/interfaces/food.interface';
import { Wishlist } from './interface/wishlist.interface';

@Injectable()
export class WishlistService {
  constructor(
    @Inject('WISHLIST_MODEL')
    private readonly wishlistModel: Model<Wishlist>,

    @Inject('USERS_MODEL') private userModel: Model<Users>,
    @Inject('FOOD_MODEL')
    private readonly foodModel: Model<any>,
  ) {}

  async toggle(req: any, foodId: string) {
    const userId = req?.user?._id;
    console.log(userId);

    const food = await this.foodModel.findById(foodId);
    if (!food) {
      throw new NotFoundException('Food not found with this id');
    }

    const existingWishlist = await this.wishlistModel.findOne({
      user: userId,
      food: foodId,
    });

    // 3️⃣ Toggle
    if (existingWishlist) {
      await this.wishlistModel.deleteOne({ _id: existingWishlist._id });

      return {
        message: 'Removed from wishlist',
        isWishlisted: false,
      };
    }

    await this.wishlistModel.create({
      user: userId,
      food: foodId,
    });

    return {
      message: 'Added to wishlist',
      isWishlisted: true,
    };
  }

  findAll() {
    return `This action returns all wishlist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}
