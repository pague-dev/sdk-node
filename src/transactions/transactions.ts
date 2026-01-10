import { GetOnlyResource } from '../common';
import type { Transaction } from './interfaces';

export class Transactions extends GetOnlyResource<Transaction> {
  protected readonly endpoint = '/transactions';
}
