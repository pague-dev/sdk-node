/**
 * Available webhook event types
 */
export type WebhookEventType =
  | 'payment_completed'
  | 'refund_completed'
  | 'withdrawal_completed'
  | 'withdrawal_failed';

/**
 * Base webhook payload structure
 */
export interface WebhookPayload<T extends WebhookEventType, D> {
  /** Type of event that triggered the webhook */
  event: T;
  /** Unique event identifier (typically the transaction ID) */
  eventId: string;
  /** ISO 8601 formatted timestamp of when the event occurred */
  timestamp: string;
  /** Event-specific data */
  data: D;
}

/**
 * Data payload for payment_completed event
 */
export interface PaymentCompletedData {
  /** Transaction identifier */
  transactionId: string;
  /** Environment where the transaction occurred */
  environment: 'production' | 'sandbox';
  /** Payment amount */
  amount: number;
  /** Platform fees charged */
  feeAmount: number;
  /** Amount received after fees (amount - feeAmount) */
  netAmount: number;
  /** Currency code (e.g., "BRL") */
  currency: string;
  /** Payment method used (e.g., "pix") */
  paymentMethod: string;
  /** Payment status */
  status: 'completed';
  /** ISO 8601 timestamp of when payment was completed */
  completedAt: string;
  /** Your external reference ID (optional) */
  externalReference?: string;
  /** Custom metadata passed when creating the payment */
  metadata?: Record<string, unknown>;
}

/**
 * Data payload for refund_completed event
 */
export interface RefundCompletedData {
  /** Refund transaction identifier */
  refundTransactionId: string;
  /** Original payment transaction ID that was refunded */
  originalTransactionId: string;
  /** Environment where the transaction occurred */
  environment: 'production' | 'sandbox';
  /** Refunded amount */
  amount: number;
  /** Fees charged for the refund */
  feeAmount: number;
  /** Net amount after fees */
  netAmount: number;
  /** Currency code (e.g., "BRL") */
  currency: string;
  /** Refund status */
  status: 'completed';
  /** ISO 8601 timestamp of when refund was completed */
  completedAt: string;
  /** Custom metadata from the original payment */
  metadata?: Record<string, unknown>;
}

/**
 * Data payload for withdrawal_completed event
 */
export interface WithdrawalCompletedData {
  /** Withdrawal identifier */
  withdrawalId: string;
  /** Environment where the withdrawal occurred */
  environment: 'production' | 'sandbox';
  /** Withdrawal amount */
  amount: number;
  /** Fees charged for the withdrawal */
  feeAmount: number;
  /** Net amount transferred (amount - feeAmount) */
  netAmount: number;
  /** Currency code (e.g., "BRL") */
  currency: string;
  /** Withdrawal status */
  status: 'completed';
  /** ISO 8601 timestamp of when withdrawal was completed */
  completedAt: string;
  /** Custom metadata from the withdrawal request */
  metadata?: Record<string, unknown>;
}

/**
 * Data payload for withdrawal_failed event
 */
export interface WithdrawalFailedData {
  /** Withdrawal identifier */
  withdrawalId: string;
  /** Environment where the withdrawal occurred */
  environment: 'production' | 'sandbox';
  /** Withdrawal amount */
  amount: number;
  /** Fees that would have been charged */
  feeAmount: number;
  /** Net amount that would have been transferred */
  netAmount: number;
  /** Currency code (e.g., "BRL") */
  currency: string;
  /** Withdrawal status */
  status: 'failed';
  /** ISO 8601 timestamp of when withdrawal failed */
  failedAt: string;
  /** Reason for failure (e.g., "insufficient_funds", "invalid_account") */
  failureReason: string;
  /** Custom metadata from the withdrawal request */
  metadata?: Record<string, unknown>;
}

/**
 * Payment completed webhook event
 */
export type PaymentCompletedEvent = WebhookPayload<'payment_completed', PaymentCompletedData>;

/**
 * Refund completed webhook event
 */
export type RefundCompletedEvent = WebhookPayload<'refund_completed', RefundCompletedData>;

/**
 * Withdrawal completed webhook event
 */
export type WithdrawalCompletedEvent = WebhookPayload<'withdrawal_completed', WithdrawalCompletedData>;

/**
 * Withdrawal failed webhook event
 */
export type WithdrawalFailedEvent = WebhookPayload<'withdrawal_failed', WithdrawalFailedData>;

/**
 * Union type of all possible webhook events
 */
export type WebhookEvent =
  | PaymentCompletedEvent
  | RefundCompletedEvent
  | WithdrawalCompletedEvent
  | WithdrawalFailedEvent;

/**
 * Webhook headers sent with each request
 */
export interface WebhookHeaders {
  /** HMAC-SHA256 signature of the payload */
  'x-webhook-signature': string;
  /** Unix timestamp in milliseconds when webhook was sent */
  'x-webhook-timestamp': string;
  /** Content type (always application/json) */
  'content-type': string;
}
