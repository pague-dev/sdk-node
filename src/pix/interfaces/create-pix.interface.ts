import type { Response } from '../../interfaces';
import type { PixCharge } from './pix.interface';

export interface CreatePixCustomer {
  name: string;
  document: string;
  email?: string;
  phone?: string;
}

export interface CreatePixOptions {
  amount: number;
  description?: string;
  customerId?: string;
  customer?: CreatePixCustomer;
  projectId?: string;
  expiresIn?: number;
  externalReference?: string;
  metadata?: Record<string, unknown>;
}

export type CreatePixResponse = Response<PixCharge>;
