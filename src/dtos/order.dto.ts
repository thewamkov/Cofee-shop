export class OrderDto {
  id: string;
  totalPrice?: number;
  discount: number;
  userId: string;
  orderItems: string[];
}
