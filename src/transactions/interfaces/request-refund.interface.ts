import type { Response } from '../../interfaces';

export interface RequestRefundOptions {
  /** Optional reason for the refund (max 255 chars) */
  reason?: string;
}

/**
 * Status returned by the PSP for the refund request.
 *
 * - `PENDING`: refund accepted by the PSP, awaiting settlement. Final confirmation arrives via `refund_completed` webhook.
 * - `CONFIRMED`: refund settled synchronously.
 * - `ERROR`: PSP rejected the refund request.
 */
export type RequestRefundStatus = 'PENDING' | 'CONFIRMED' | 'ERROR';

export interface RequestRefund {
  /** Original transaction ID being refunded */
  originalTransactionId: string;
  /** PSP that processed the refund */
  pspProvider: string;
  /** Refund transaction ID at the PSP */
  pspRefundTransactionId: string;
  /** PSP-reported status */
  status: RequestRefundStatus;
}

export type RequestRefundResponse = Response<RequestRefund>;
