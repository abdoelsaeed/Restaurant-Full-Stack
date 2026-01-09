export interface ItemCart {
  foodId: string;
  quantity: number;
  price: number;
  _id: string;
}
export interface Cart {
  items: ItemCart[];
  totalPrice: number;
  user: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: unknown;
}
