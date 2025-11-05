// ===== ENUMS =====
export enum KycStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
  REQUIRES_UPDATE = 'REQUIRES_UPDATE'
}

// ===== REQUEST =====
export interface CustomerRequest {
  name: string;
  phone?: string;
  dni?: string;
  address?: string;
  dateOfBirth?: string; // ISO date string
  nationality?: string;
  occupation?: string;
}

// ===== RESPONSE =====
export interface CustomerResponse {
  id: string;
  userId: string;
  name: string;
  phone?: string;
  dni?: string;
  address?: string;
  dateOfBirth?: string; // ISO date string
  nationality?: string;
  occupation?: string;
  kycStatus: KycStatus;
  kycDocuments?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
