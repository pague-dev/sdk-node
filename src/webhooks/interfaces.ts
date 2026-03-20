/**
 * Available webhook event types
 */
export type WebhookEventType =
  | 'payment_completed'
  | 'payment_expired'
  | 'refund_completed'
  | 'withdrawal_completed'
  | 'withdrawal_failed'
  | 'withdrawal_reversed'
  | 'balance_block_created';

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
 * Data payload for payment_expired event
 */
export interface PaymentExpiredData {
  /** Transaction identifier */
  transactionId: string;
  /** Environment where the transaction occurred */
  environment: 'production' | 'sandbox';
  /** Payment amount */
  amount: number;
  /** Platform fees (always 0 for expired payments) */
  feeAmount: number;
  /** Net amount (always 0 for expired payments) */
  netAmount: number;
  /** Currency code (e.g., "BRL") */
  currency: string;
  /** Payment method used (e.g., "pix") */
  paymentMethod: string;
  /** Payment status */
  status: 'expired';
  /** ISO 8601 timestamp of when payment expired */
  expiredAt: string;
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
  /** Payment method of the original transaction */
  paymentMethod: string;
  /** Refund status */
  status: 'completed';
  /** ISO 8601 timestamp of when refund was completed */
  refundedAt: string;
  /** Your external reference ID from the original payment (optional) */
  externalReference?: string;
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
 * Data payload for withdrawal_reversed event
 */
export interface WithdrawalReversedData {
  /** Reversal transaction identifier */
  reversalTransactionId: string;
  /** Original withdrawal transaction ID that was reversed */
  originalTransactionId: string;
  /** Environment where the transaction occurred */
  environment: 'production' | 'sandbox';
  /** Reversal amount */
  amount: number;
  /** Fees charged for the reversal */
  feeAmount: number;
  /** Net amount after fees */
  netAmount: number;
  /** Currency code (e.g., "BRL") */
  currency: string;
  /** Payment method (e.g., "pix") */
  paymentMethod: string;
  /** Reversal status */
  status: 'completed';
  /** ISO 8601 timestamp of when withdrawal was reversed */
  reversedAt: string;
  /** Your external reference ID from the original withdrawal (optional) */
  externalReference?: string;
  /** Custom metadata from the original withdrawal */
  metadata?: Record<string, unknown>;
}

/**
 * Payment completed webhook event
 */
export type PaymentCompletedEvent = WebhookPayload<'payment_completed', PaymentCompletedData>;

/**
 * Payment expired webhook event
 */
export type PaymentExpiredEvent = WebhookPayload<'payment_expired', PaymentExpiredData>;

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
 * Withdrawal reversed webhook event
 */
export type WithdrawalReversedEvent = WebhookPayload<'withdrawal_reversed', WithdrawalReversedData>;

/**
 * Data payload for balance_block_created event
 */
export interface BalanceBlockCreatedData {
  /** Balance block identifier */
  blockId: string;
  /** Transaction ID of the blocked transaction */
  transactionId: string;
  /** Environment where the block was created */
  environment: 'production' | 'sandbox';
  /** Blocked amount in BRL */
  amount: number;
  /** Currency code (e.g., "BRL") */
  currency: string;
  /** Type of block (med, judicial, administrative) */
  blockType: 'med' | 'judicial' | 'administrative';
  /** Block reference number */
  referenceNumber: string;
  /** Reason for the block */
  reason: string;
  /** Block status */
  status: 'awaiting_response';
  /** ISO 8601 timestamp of when block was created */
  createdAt: string;
}

/**
 * Balance block created webhook event
 */
export type BalanceBlockCreatedEvent = WebhookPayload<'balance_block_created', BalanceBlockCreatedData>;

/**
 * Union type of all possible webhook events
 */
export type WebhookEvent =
  | PaymentCompletedEvent
  | PaymentExpiredEvent
  | RefundCompletedEvent
  | WithdrawalCompletedEvent
  | WithdrawalFailedEvent
  | WithdrawalReversedEvent
  | BalanceBlockCreatedEvent;

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
