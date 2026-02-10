import { CreateOnlyResource } from '../common';
import type { CreateWithdrawalOptions, Withdrawal } from './interfaces';

export class Withdrawals extends CreateOnlyResource<Withdrawal, CreateWithdrawalOptions> {
  protected readonly endpoint = '/withdrawals';
}
