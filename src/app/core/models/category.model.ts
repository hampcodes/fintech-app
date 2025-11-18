// ===== REQUESTS =====
export interface CategoryRequest {
  name: string;
  description?: string;
}

// ===== RESPONSES =====
export interface CategoryResponse {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
