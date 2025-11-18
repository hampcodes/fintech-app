// ===== REQUESTS =====
export interface ProductRequest {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
  imageUrl?: string;
}

// ===== RESPONSES =====
export interface ProductResponse {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
  categoryName?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}
