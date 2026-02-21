/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Food } from 'src/food/interfaces/food.interface';
import { Order } from 'src/orders/interfaces/order.interface';
// ┌─────────────────────┐
// │1) getSummary()✅     │
// │2) getSalesOverTime()✅   │
// │3) getOrdersByStatus()(Pie Chart)✅ │
// │4) getTopProducts()✅    │
// │5) getPeakDays()✅      │
// └─────────────────────┘
type Filter = {
    from?: Date;
    to?: Date;
    groupBy?: "daily" | "weekly" | "monthly";
    limit?: 10
}
@Injectable()
export class DashboardService {
    constructor(@Inject('ORDER_MODEL') private readonly orderModel: Model<Order>,
        @Inject('FOOD_MODEL') private readonly foodModel: Model<Food>) { }
    private async getSummary(filter: Filter) {
        const match: Record<string, any> = {};
        if (filter.from || filter.to) {
            match.createdAt = {}
            if (filter.from) {
                match.createdAt.$gte = filter.from;
            }
            if (filter.to) {
                match.createdAt.$lte = filter.to;
            }
        }
        const result = await this.orderModel.aggregate([
            { $match: match },

            {
                $group: {
                    _id: null,

                    totalRevenue: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "paid"] },
                                "$amount",
                                0,
                            ],
                        },
                    },
                    totalOrders: { $sum: 1 },
                    paidOrders: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "paid"] },
                                1,
                                0,
                            ],
                        },
                    },
                },
            },
        ]);
        const summary = result[0] ?? {
            totalRevenue: 0,
            totalOrders: 0,
            paidOrders: 0,
        };
        const aov = summary.paidOrders > 0 ? summary.totalRevenue / summary.paidOrders : 0;
        return {
            revenue: summary.totalRevenue,
            orders: summary.totalOrders,
            aov: Number(aov.toFixed(2)),
        };
    }
    private async getSalesOverTime(filter: Filter) {
        const { from, to, groupBy = "daily" } = filter;
        const matchStage: Record<string, any> = {
            status: "paid",
        };
        if (from || to) {
            matchStage.createdAt = {};
            if (from) matchStage.createdAt.$gte = from;
            if (to) matchStage.createdAt.$lte = to;
        }

        let groupId: any;

        if (groupBy === "daily") {
            groupId = {
                $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt",
                },
            };
        }

        if (groupBy === "monthly") {
            groupId = {
                $dateToString: {
                    format: "%Y-%m",
                    date: "$createdAt",
                },
            };
        }

        if (groupBy === "weekly") {
            groupId = {
                year: { $isoWeekYear: "$createdAt" },
                week: { $isoWeek: "$createdAt" },
            };
        }

        const result = await this.orderModel.aggregate([
            { $match: matchStage },

            {
                $group: {
                    _id: groupId,
                    revenue: { $sum: "$amount" },
                },
            },

            { $sort: { _id: 1 } },

            {
                $project: {
                    _id: 0,
                    period: "$_id",
                    revenue: 1,
                },
            },
        ]);

        return result;
    }
    private async getOrdersByStatus(filter: {
        from?: Date;
        to?: Date;
    }) {
        const matchStage: Record<string, any> = {};

        if (filter.from || filter.to) {
            matchStage.createdAt = {};

            if (filter.from) matchStage.createdAt.$gte = filter.from;
            if (filter.to) matchStage.createdAt.$lte = filter.to;
        }

        const result = await this.orderModel.aggregate([
            { $match: matchStage },

            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },

            {
                $project: {
                    _id: 0,
                    status: "$_id",
                    count: 1,
                },
            },
        ]);
        return result;
    }
    private async getTopProducts(filter: Filter) {
        const { from, to, limit = 10 } = filter;

        const matchStage: Record<string, any> = {
            status: "paid",
        };

        if (from || to) {
            matchStage.createdAt = {};
            if (from) matchStage.createdAt.$gte = from;
            if (to) matchStage.createdAt.$lte = to;
        }

        const result = await this.orderModel.aggregate([
            { $match: matchStage },

            { $unwind: "$items" },

            {
                $group: {
                    _id: "$items.productName",
                    totalQuantity: { $sum: "$items.quantity" },
                    totalRevenue: {
                        $sum: {
                            $multiply: ["$items.price", "$items.quantity"],
                        },
                    },
                },
            },

            { $sort: { totalQuantity: -1 } },

            { $limit: limit },

            {
                $project: {
                    _id: 0,
                    productName: "$_id",
                    totalQuantity: 1,
                    totalRevenue: 1,
                },
            },
        ]);

        return result;
    }
    private async getPeakDays(filter: {
        from?: Date;
        to?: Date;
    }) {
        const matchStage: Record<string, any> = {
            status: "paid",
        };

        if (filter.from || filter.to) {
            matchStage.createdAt = {};
            if (filter.from) matchStage.createdAt.$gte = filter.from;
            if (filter.to) matchStage.createdAt.$lte = filter.to;
        }

        const result = await this.orderModel.aggregate([
            { $match: matchStage },

            {
                $group: {
                    _id: { $dayOfWeek: "$createdAt" },
                    orders: { $sum: 1 },
                },
            },

            { $sort: { orders: -1 } },

            {
                $project: {
                    _id: 0,
                    dayNumber: "$_id",
                    orders: 1,
                },
            },
        ]);

        const daysMap = [
            "", // index 0 unused
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        return result.map((item) => ({
            day: daysMap[item.dayNumber],
            orders: item.orders,
        }));
    }
    async DashboardStatisticsPage(query: Filter) {
        const { from, to, groupBy = "daily" } = query;

        const filter: Filter = { from, to };
        const [
            summary,
            salesOverTime,
            ordersByStatus,
            topProducts,
            peakDays,
        ] = await Promise.all([
            this.getSummary(filter),
            this.getSalesOverTime({ ...filter, groupBy }),
            this.getOrdersByStatus(filter),
            this.getTopProducts(filter),
            this.getPeakDays(filter),
        ]);
        return {
            summary,
            salesOverTime,
            ordersByStatus,
            topProducts,
            peakDays
        };
    }
    async duplicateFood(id: string) {
        
        const food = await this.foodModel.findById(id);
        if (!food) {
            throw new NotFoundException('Food not found');
        }
        const duplicatedFood = await this.foodModel.create({
            name: food.name + ' ' + 'copy',
            price: food.price,
            discount: food.discount,
            ingredients: food.ingredients,
            type: food.type,
            finalPrice: food.finalPrice,
            mealTimes: food.mealTimes,
            image: food.image,
        })
        if (!duplicatedFood) {
            throw new Error('Failed to duplicate food')
        }
        return {
            message: 'Food duplicated successfully',
            data: duplicatedFood
        }
    }

}
