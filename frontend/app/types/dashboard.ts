export type productId = { _id: string; name: string; finalPrice: number; image: string }
export type ItemOrder = {
    productName: string;
    image: string;
    price: number;
    quantity: number
    productId: productId
}
export type ItemCardProps = {
    items: ItemOrder[]
}