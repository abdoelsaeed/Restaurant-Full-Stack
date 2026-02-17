/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Model } from 'mongoose';
import { Order } from './interfaces/order.interface';
import { StripeService } from '../stripe/stripe.service';
import { Cart } from '../cart/interfaces/cart.interface';
import { Users } from '../users/interfaces/user.interface';


@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_MODEL') private readonly orderModel: Model<Order>,
    @Inject('CART_MODEL') private readonly cartModel: Model<Cart>,
    @Inject('USERS_MODEL') private readonly userModel: Model<Users>,
    private readonly stripeService: StripeService,
  ) {}
  async createCheckoutSession(createOrderDto: CreateOrderDto, userId: string) {
    const cart = await this.cartModel
      .findOne({
        user: userId,
        status: 'active',
      })
      .populate('items.foodId');
    const user = await this.userModel.findById(userId).select('email active');

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    if (cart.status !== 'active') {
      throw new BadRequestException('Cart is not active');
    }
    if (!user) {
      throw new BadRequestException('User is not active or not found');
    }
    if (!cart.items || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }
    const images: string[] = [];
    let totalAmount = 0;
    const orderItems = cart.items.map((cartItem) => {
      const food = cartItem.foodId as any;
      images.push(food.image.trim());
      if (!food || !food.active) {
        throw new BadRequestException(
          `Item ${food?.name || 'Unknown'} is not available`,
        );
      }

      const itemPrice = food.finalPrice || food.price;
      totalAmount += itemPrice * cartItem.quantity;

      return {
        productId: food._id,
        productName: food.name,
        price: Math.round(itemPrice * 100), // 👈 cents
        quantity: cartItem.quantity,
      };
    });

    const order = await this.orderModel.create({
      userId,
      email: user?.email,
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: createOrderDto?.currency || 'usd',
      items: orderItems,
      status: 'pending',
    });

    const session = await this.stripeService.stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: order.email,
      line_items: order.items?.map((item, i) => ({
        price_data: {
          currency: order.currency || 'usd',
          product_data: {
            name: item.productName,
            images: images[i] ? [images[i]] : [], // 👈 صح
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.FRONTEND_URL}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart?cancelled=true`,
      metadata: {
        orderId: order._id.toString(),
      },
    });
    order.stripeSessionId = session.id;
    order.stripeCustomerId = userId;
    await order.save();
    return { url: session.url };
  }

  // Backend/src/orders/orders.service.ts

  async findMyOrders(userId: string) {
    try {
      // Find orders for the user, sorted by newest first
      const orders = await this.orderModel
        .find({ userId })
        .populate({
          path: 'items.productId',
          select: 'name image finalPrice', // Select only needed fields
        })
        .sort({ createdAt: -1 }) // Newest first
        .limit(50); // Limit for performance

      // Transform data for better frontend consumption
      const transformedOrders = orders.map((order) => ({
        _id: order._id,
        email: order.email,
        amount: order.amount,
        currency: order.currency,
        status: order.status,
        items: order.items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
          image: (item.productId as any)?.image || null,
        })),
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      }));

      return {
        success: true,
        message: 'Orders retrieved successfully',
        data: transformedOrders,
        count: transformedOrders.length,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve orders',
        data: [],
        count: 0,
      };
    }
  }

  async findAllOrdersWithFilter(params: {
    status?: Order['status'];
    page?: number;
    limit?: number;
  }) {
    try {
      const page = Math.max(1, Number(params.page) || 1);
      const limit = Math.min(100, Math.max(1, Number(params.limit) || 20));

      const query: { status?: Order['status'] } = {};
      if (params.status) {
        const allowedStatuses: Order['status'][] = [
          'pending',
          'paid',
          'failed',
          'cancelled',
          'refunded',
        ];
        if (!allowedStatuses.includes(params.status)) {
          throw new BadRequestException(
            `Invalid status. Allowed: ${allowedStatuses.join(', ')}`,
          );
        }
        query.status = params.status;
      }

      const [orders, total] = await Promise.all([
        this.orderModel
          .find(query)
          .populate({
            path: 'items.productId',
            select: 'name image finalPrice',
          })
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit),
        this.orderModel.countDocuments(query),
      ]);

      const transformedOrders = orders.map((order) =>
        this.transformOrder(order),
      );

      return {
        success: true,
        message: 'Orders retrieved successfully',
        data: transformedOrders,
        meta: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit) || 1,
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve orders',
        data: [],
        meta: {
          total: 0,
          page: 1,
          limit: 20,
          pages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };
    }
  }

  async updateOrderStatus(orderId: string, status: Order['status']) {
    const order = await this.orderModel.findById(orderId);

    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }

    if (order.status === status) {
      return {
        success: true,
        message: `Order already ${status}`,
        data: order,
      };
    }

    const invalidTransitions: Record<string, string[]> = {
      paid: ['pending'],
      refunded: ['paid'],
    };

    if (invalidTransitions[order.status]?.includes(status)) {
      throw new BadRequestException(
        `Cannot change order from ${order.status} to ${status}`,
      );
    }

    order.status = status;
    order.updatedAt = new Date();
    await order.save();
    if (status === 'paid') {
      await this.cartModel.findOneAndUpdate(
        { user: order.userId, status: 'active' },
        {
          status: 'ordered',
          items: [],
          totalPrice: 0,
        },
      );
    }

    return {
      success: true,
      message: `Order updated to ${status}`,
      data: order,
    };
  }
  // Backend/src/orders/orders.service.ts

  async getMyStatistics(userId: string) {
    try {
      // Get all orders for the user
      const orders = await this.orderModel.find({ userId });

      // Calculate statistics
      const totalOrders = orders.length;
      const completedOrders = orders.filter(
        (order) => order.status === 'paid',
      ).length;
      const pendingOrders = orders.filter(
        (order) => order.status === 'pending',
      ).length;

      // Calculate total spent (only paid orders)
      const totalSpent = orders
        .filter((order) => order.status === 'paid')
        .reduce((sum, order) => sum + order.amount / 100, 0); // Convert cents to dollars

      // For now, reviews are 0 (can be implemented later with reviews system)
      const reviewsGiven = 0;

      return {
        success: true,
        message: 'Statistics retrieved successfully',
        data: {
          totalOrders,
          completedOrders,
          pendingOrders,
          reviewsGiven,
          totalSpent,
        },
      };
    } catch (error) {
      console.error('Error getting statistics:', error);
      return {
        success: false,
        message: 'Failed to retrieve statistics',
        data: {
          totalOrders: 0,
          completedOrders: 0,
          pendingOrders: 0,
          reviewsGiven: 0,
          totalSpent: 0,
        },
      };
    }
  }

  private transformOrder(order: Order) {
    return {
      _id: order._id,
      email: order.email,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
      items: order.items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
        image: (item.productId as any)?.image || null,
      })),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
