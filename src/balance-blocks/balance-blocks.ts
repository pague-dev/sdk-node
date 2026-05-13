import type { Response } from '../interfaces';
import type { Pdev } from '../pdev';
import type {
  BalanceBlocksList,
  ListBalanceBlocksOptions,
} from './interfaces';

/**
 * Balance blocks (MED / judicial / administrative) held against the account.
 *
 * Requires the `BALANCE_BLOCK:READ` permission on the integration key.
 */
export class BalanceBlocks {
  private readonly endpoint = '/balance-blocks';

  constructor(private readonly pdev: Pdev) {}

  /**
   * List balance blocks on the account, optionally filtered by status.
   */
  async list(options: ListBalanceBlocksOptions = {}): Promise<Response<BalanceBlocksList>> {
    return this.pdev.get<BalanceBlocksList>(this.endpoint, {
      query: options.status ? { status: options.status } : undefined,
    });
  }
}
