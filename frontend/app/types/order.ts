// frontend/app/types/order.ts

export interface OrderItem {
  productId: {
    _id: string;
    name: string;
    finalPrice: number;
    image: string;
  };
  productName: string;
  price: number; // Price in cents (Stripe format)
  quantity: number;
  image: string;
}

export interface Order {
  _id: string;
  email: string;
  amount: number; // Total amount in cents
  currency: string;
  status: "pending" | "paid" | "cancelled";
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  success: boolean;
  message: string;
  data: Order[];
  count: number;
}
