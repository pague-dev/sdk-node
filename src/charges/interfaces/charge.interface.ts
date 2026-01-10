export type ChargeStatus = 'active' | 'expired' | 'disabled' | 'paid';
export type PaymentMethod = 'pix' | 'credit_card' | 'boleto';
export type NotificationType = 'email';

export interface Charge {
  id: string;
  projectId: string;
  customerId?: string;
  name: string;
  description?: string;
  amount: number;
  currency: string;
  status: ChargeStatus;
  slug: string;
  url: string;
  paymentMethods: PaymentMethod[];
  maxInstallments?: number;
  notifications: NotificationType[];
  allowCoupons: boolean;
  expiresAt?: string;
  paymentsCount: number;
  totalCollected: number;
  createdAt: string;
  updatedAt?: string;
}
