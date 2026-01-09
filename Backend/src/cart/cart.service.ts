/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddToCartDto } from './dto/create-cart.dto';
import { Model } from 'mongoose';
import { Cart } from './interfaces/cart.interface';
import { Users } from 'src/users/interfaces/user.interface';
import { Food } from 'src/food/interfaces/food.interface';

@Injectable()
export class CartService {
  constructor(
    @Inject('CART_MODEL') private cartModel: Model<Cart>,
    @Inject('USERS_MODEL') private userModel: Model<Users>,
    @Inject('FOOD_MODEL') private foodModel: Model<Food>,
  ) {}
  async addToCart(addToCartDto: AddToCartDto, userId: string) {
    const { foodId, quantity } = addToCartDto;
    // 1️⃣ Validate food exists
    const food = await this.foodModel.findById(foodId);
    if (!food) {
      throw new NotFoundException('Food not found');
    }

    // 2️⃣ Check availability
    if (!food.active) {
      throw new BadRequestException('Food is currently unavailable');
    }

    // 3️⃣ Resolve price (snapshot)
    const itemPrice = food.finalPrice ?? food.price;
    if (itemPrice == null) {
      throw new BadRequestException('Invalid food price');
    }

    // 4️⃣ Validate quantity
    const itemQuantity =
      quantity && Number.isInteger(quantity) && quantity > 0 ? quantity : 1;

    // 5️⃣ Find active cart
    let cart = await this.cartModel.findOne({
      user: userId,
      status: 'active',
    });

    // 6️⃣ Create cart if not exists
    if (!cart) {
      cart = await this.cartModel.create({
        user: userId,
        items: [
          {
            foodId: food._id,
            quantity: itemQuantity,
            price: itemPrice,
          },
        ],
        totalPrice: itemPrice * itemQuantity,
      });

      return {
        message: 'Cart created successfully',
        status: 200,
        data: cart,
      };
    }

    // 7️⃣ Update existing cart
    const existingItem = cart.items.find((i) => i.foodId.toString() === foodId);

    if (existingItem) {
      existingItem.quantity += itemQuantity;
    } else {
      cart.items.push({
        foodId: food._id,
        quantity: itemQuantity,
        price: itemPrice,
      });
    }

    // 8️⃣ Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0,
    );

    await cart.save();

    return {
      message: 'Item added to cart successfully',
      status: 200,
      data: cart,
    };
  }

  async getMyCart(userId: string) {
    const cart = await this.cartModel
      .findOne({ user: userId, status: 'active' })
      .populate('items.foodId');

    if (!cart) {
      return {
        message: 'No active cart found',
        status: 404,
        data: null,
      };
    }

    return {
      message: 'Cart retrieved successfully',
      status: 200,
      data: cart,
    };
  }

  // Backend/restaurant/src/cart/cart.service.ts

  async countMyCart(userId: string) {
    // 1️⃣ Find active cart
    const cart = await this.cartModel.findOne({
      user: userId,
      status: 'active',
    });

    // 2️⃣ No cart → count = 0
    if (!cart || !cart.items || cart.items.length === 0) {
      return {
        message: 'Cart is empty',
        status: 200,
        data: {
          count: 0,
          hasItems: false,
        },
      };
    }

    // 3️⃣ Count TOTAL quantities (مش عدد العناصر)
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      message: 'Cart count retrieved successfully',
      status: 200,
      data: {
        count: itemCount,
        hasItems: itemCount > 0,
      },
    };
  }

  // Backend/restaurant/src/cart/cart.service.ts

  // Backend/restaurant/src/cart/cart.service.ts

  async updateCartQuantity(
    userId: string,
    foodId: string,
    newQuantity: number,
  ) {
    const cart = await this.cartModel.findOne({
      user: userId,
      status: 'active',
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // ✅ البحث بالـ foodId
    const item = cart.items.find((i) => i.foodId.toString() === foodId);

    if (!item) {
      throw new NotFoundException('Item not found in cart');
    }

    if (newQuantity < 1) {
      throw new BadRequestException('Quantity must be at least 1');
    }

    item.quantity = newQuantity;

    cart.totalPrice = cart.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0,
    );

    await cart.save();
    await cart.populate('items.foodId');

    return {
      message: 'Quantity updated successfully',
      status: 200,
      data: cart,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
