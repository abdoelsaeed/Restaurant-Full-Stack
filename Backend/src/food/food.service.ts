/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { FindFoodsQueryDto } from './dto/find-foods.query.dto';
import {
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { Model } from 'mongoose';
import { Food } from './interfaces/food.interface';
import { Wishlist } from 'src/wishlist/interface/wishlist.interface';

@Injectable()
export class FoodService {
  constructor(
    @Inject('FOOD_MODEL') private foodModel: Model<Food>,
    @Inject('WISHLIST_MODEL') 
    private readonly wishlistModel: Model<Wishlist>,
  ) {}
  async createFood(createFoodDto: CreateFoodDto) {
    try {
      const newFood = await this.foodModel.create(createFoodDto);
      if (!newFood) throw new NotFoundException('Food not created');
      return {
        message: 'Food created successfully',
        status: HttpStatus.CREATED,
        data: newFood,
      };
    } catch (error: any) {
      throw new InternalServerErrorException('Error creating food', error);
    }
  }

  async getHomeData() {
    const projection = 'name image price finalPrice discount';
    const [populars, featured, offers] = await Promise.all([
      this.foodModel
        .find({ active: true })
        .sort({ ordersCount: -1 })
        .limit(10)
        .select(projection),

      this.foodModel
        .find({ isFeatured: true, active: true })
        .limit(5)
        .select(projection),

      this.foodModel
        .find({ discount: { $gt: 0 }, active: true })
        .limit(10)
        .select(projection),
    ]);
    return {
      status: 200,
      message: 'home data fetched successfully',
      data: { populars, featured, offers },
    };
  }

  async findAllFoods(query: FindFoodsQueryDto, userId?: string) {
    const {
      type,
      mealTime,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      q,
      limit = 10,
    } = query;
    const filter: any = { active: true };
    if (type) {
      filter.type = type;
    }
    if (mealTime) filter.mealTimes = mealTime;
    const sort: any = {
      [sortBy]: order === 'asc' ? 1 : -1,
    };
    const skip = (page - 1) * limit;
    if (q) filter.name = { $regex: q, $options: 'i' };
    const [foods, total] = await Promise.all([
      this.foodModel.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      this.foodModel.countDocuments(filter),
    ]);
    // 🟡 Guest → رجّع من غير Wishlist
    if (!userId) {
      return {
        status: 200,
        message: 'foods fetched successfully',
        meta: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
        data: foods,
      };
    }

    // 🟢 Logged in → هات wishlist
    const wishlistedFoodIds = await this.wishlistModel
      .find({ user: userId })
      .distinct('food');

    const wishlistSet = new Set(wishlistedFoodIds.map((id) => id.toString()));

    const foodsWithWishlist = foods.map((food) => ({
      ...food,
      isWishlisted: wishlistSet.has(food._id.toString()),
    }));


    return {
      status: 200,
      message: 'foods fetched successfully',
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
      data: foodsWithWishlist,
    };
  }

  async findOne(id: string) {
    const food = await this.foodModel.findById(id);

    if (!food) {
      throw new NotFoundException('Not found food with this id');
    }

    return food;
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
