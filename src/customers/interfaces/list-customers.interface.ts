import type { PaginatedResponse, PaginationOptions, Response } from '../../interfaces';
import type { Customer } from './customer.interface';

export interface ListCustomersOptions extends PaginationOptions {
  search?: string;
}

export type ListCustomersResponse = Response<PaginatedResponse<Customer>>;
