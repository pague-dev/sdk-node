export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';
export type TransactionType = 'payment' | 'fee' | 'refund' | 'chargeback' | 'withdrawal';
export type TransactionPaymentMethod = 'pix' | 'credit_card' | 'boleto';

export interface Transaction {
  id: string;
  status: TransactionStatus;
  type: TransactionType;
  paymentMethod: TransactionPaymentMethod;
  amount: number;
  currency: string;
  description?: string;
  externalReference?: string;
  customerId?: string;
  projectId?: string;
  metadata?: Record<string, unknown>;
  pixCopyPaste?: string;
  qrCodeBase64?: string;
  expiresAt?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt?: string;
}
