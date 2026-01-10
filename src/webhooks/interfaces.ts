/**
 * Available webhook event types
 */
export type WebhookEventType =
  | 'payment_completed'
  | 'payment_failed'
  | 'refund_completed';

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
}

/**
 * Data payload for payment_failed event
 */
export interface PaymentFailedData {
  /** Transaction identifier */
  transactionId: string;
  /** Payment amount */
  amount: number;
  /** Currency code (e.g., "BRL") */
  currency: string;
  /** Payment method used (e.g., "pix") */
  paymentMethod: string;
  /** Payment status */
  status: 'failed';
  /** ISO 8601 timestamp of when payment failed */
  failedAt: string;
  /** Reason for failure (e.g., "expired", "insufficient_funds") */
  failureReason: string;
}

/**
 * Data payload for refund_completed event
 */
export interface RefundCompletedData {
  /** Refund transaction identifier */
  refundTransactionId: string;
  /** Original payment transaction ID that was refunded */
  originalTransactionId: string;
  /** Refunded amount */
  amount: number;
  /** Fees (typically 0 for refunds) */
  feeAmount: number;
  /** Currency code (e.g., "BRL") */
  currency: string;
  /** Refund status */
  status: 'completed';
  /** ISO 8601 timestamp of when refund was completed */
  refundedAt: string;
}

/**
 * Payment completed webhook event
 */
export type PaymentCompletedEvent = WebhookPayload<'payment_completed', PaymentCompletedData>;

/**
 * Payment failed webhook event
 */
export type PaymentFailedEvent = WebhookPayload<'payment_failed', PaymentFailedData>;

/**
 * Refund completed webhook event
 */
export type RefundCompletedEvent = WebhookPayload<'refund_completed', RefundCompletedData>;

/**
 * Union type of all possible webhook events
 */
export type WebhookEvent =
  | PaymentCompletedEvent
  | PaymentFailedEvent
  | RefundCompletedEvent;

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

