import type { Response } from '../../interfaces';
import type { Charge, PaymentMethod } from './charge.interface';

export interface CreateChargeOptions {
  projectId: string;
  name: string;
  description?: string;
  amount: number;
  paymentMethods: PaymentMethod[];
  expiresAt?: string;
  customerId?: string;
}

export type CreateChargeResponse = Response<Charge>;
