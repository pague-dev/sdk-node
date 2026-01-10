import type { Response } from '../../interfaces';
import type { Customer } from './customer.interface';

export interface CreateCustomerOptions {
  name: string;
  document: string;
  email?: string;
  phone?: string;
}

export type CreateCustomerResponse = Response<Customer>;
