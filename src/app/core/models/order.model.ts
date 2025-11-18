// ===== ENUMS =====
export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

// ===== REQUESTS =====
export interface OrderItemRequest {
  productId: string;
  quantity: number;
}

export interface OrderRequest {
  items: OrderItemRequest[];
  accountNumber: string; // Para realizar el pago desde una cuenta
}

// ===== RESPONSES =====
export interface OrderItemResponse {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderResponse {
  id: string;
  userId: string;
  userName: string;
  accountNumber: string;
  items: OrderItemResponse[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
