export type PixStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface PixCharge {
  id: string;
  status: PixStatus;
  amount: number;
  currency: string;
  pixCopyPaste: string;
  expiresAt: string;
  externalReference?: string;
  customerId?: string;
  createdAt: string;
}
