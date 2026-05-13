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
  /**
   * Existing customer ID. Provide either `customerId` or `customer`, not both.
   * If both are omitted, the endpoint creates a static QR code (no payer, no
   * invoice). Static path requires the account's PSP to be `avista` or `mock`.
   */
  customerId?: string;
  /**
   * Inline customer data. Provide either `customerId` or `customer`, not both.
   * If both are omitted, the endpoint creates a static QR code.
   */
  customer?: CreatePixCustomer;
  projectId?: string;
  expiresIn?: number;
  externalReference?: string;
  metadata?: Record<string, unknown>;
}

export type CreatePixResponse = Response<PixCharge>;
