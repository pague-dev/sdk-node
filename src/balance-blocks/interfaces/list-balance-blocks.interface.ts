import type { Response } from '../../interfaces';
import type { BalanceBlock, BalanceBlockStatus } from './balance-block.interface';

export interface ListBalanceBlocksOptions {
  /** Filter by block status. If omitted, returns all blocks on the account. */
  status?: BalanceBlockStatus;
}

export interface BalanceBlocksList {
  items: BalanceBlock[];
  total: number;
}

export type ListBalanceBlocksResponse = Response<BalanceBlocksList>;
