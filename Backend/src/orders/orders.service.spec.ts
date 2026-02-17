/* eslint-disable prettier/prettier */
import { Test, TestingModule } from "@nestjs/testing";
import { OrdersService } from "./orders.service"
import { NotFoundException } from "@nestjs/common";
import { StripeService } from "./../stripe/stripe.service";

describe('OrdersService - updateOrderStatus',()=>{
    let ordersService: OrdersService;
    const mockOrderModel={
        findById:jest.fn()
    }
    const mockCartModel={
        findById:jest.fn(),
        findOneAndUpdate: jest.fn()
    }
    beforeEach(async()=>{
        const module: TestingModule = await Test.createTestingModule({
            providers:[OrdersService,  
                { provide: 'ORDER_MODEL', useValue: mockOrderModel },
                { provide: 'CART_MODEL', useValue: mockCartModel },
                { provide: 'USERS_MODEL', useValue: {} },
                { provide: StripeService, useValue: {} },
            ]
        }).compile()
        ordersService = module.get<OrdersService>(OrdersService)
    })
    it('should throw NotFoundException if order does not exist',async()=>{
        mockCartModel.findById.mockResolvedValue(null);
        await expect(
            ordersService.updateOrderStatus('fake-order-id', 'paid'),
        ).rejects.toThrow(NotFoundException);    })
    it('should return success if status is the same (idempotency)', async () => {
        // Arrange
        const mockOrder = {
            _id: 'order-id',
            status: 'pending',
            userId: 'user-id',
            save: jest.fn(),
        };

        mockOrderModel.findById.mockResolvedValue(mockOrder);

        // Act
        const result = await ordersService.updateOrderStatus(
            'order-id',
            'pending',
        );

        // Assert
        expect(result.success).toBe(true);
        expect(result.message).toBe('Order already pending');

        // 👇 أهم assertions
        expect(mockOrder.save).not.toHaveBeenCalled();
        expect(mockCartModel.findOneAndUpdate).not.toHaveBeenCalled();
    });
    it('should return success if status is the same (idempotency)', async () => {
        // Arrange
        const mockOrder = {
            _id: 'order-id',
            status: 'pending',
            userId: 'user-id',
            save: jest.fn(),
        };

        mockOrderModel.findById.mockResolvedValue(mockOrder);

        // Act
        const result = await ordersService.updateOrderStatus(
            'order-id',
            'pending',
        );

        // Assert
        expect(result.success).toBe(true);
        expect(result.message).toBe('Order already pending');

        // 👇 أهم assertions
        expect(mockOrder.save).not.toHaveBeenCalled();
        expect(mockCartModel.findOneAndUpdate).not.toHaveBeenCalled();
    });


    afterEach(() => {
        jest.clearAllMocks();
    });
})