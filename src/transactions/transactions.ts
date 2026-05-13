import { GetOnlyResource } from '../common';
import type { Response } from '../interfaces';
import type { RequestRefund, RequestRefundOptions, Transaction } from './interfaces';

export class Transactions extends GetOnlyResource<Transaction> {
  protected readonly endpoint = '/transactions';

  /**
   * Request a full refund of a payment transaction.
   *
   * The refund is asynchronous — confirmation arrives via the `refund_completed`
   * webhook once the PSP settles it. The returned status reflects the PSP's
   * synchronous response (typically `PENDING`).
   *
   * Requires the `REFUND:WRITE` permission on the integration key.
   */
  async refund(
    id: string,
    options: RequestRefundOptions = {},
  ): Promise<Response<RequestRefund>> {
    return this.pdev.post<RequestRefund>(`${this.endpoint}/${id}/refund`, options);
  }
}
