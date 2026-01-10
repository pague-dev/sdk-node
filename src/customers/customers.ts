import { BaseResource } from '../common';
import type {
  CreateCustomerOptions,
  Customer,
  ListCustomersOptions,
} from './interfaces';

export class Customers extends BaseResource<Customer, CreateCustomerOptions, ListCustomersOptions> {
  protected readonly endpoint = '/customers';
}
