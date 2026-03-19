import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import type { WebhookEvent } from './interfaces';

/**
 * Type guard to check if an event is a valid WebhookEvent
 */
function isValidWebhookEvent(event: unknown): event is WebhookEvent {
  if (typeof event !== 'object' || event === null) {
    return false;
  }

  const obj = event as Record<string, unknown>;

  if (typeof obj.event !== 'string') return false;
  if (typeof obj.eventId !== 'string') return false;
  if (typeof obj.timestamp !== 'string') return false;
  if (typeof obj.data !== 'object' || obj.data === null) return false;

  const validEvents = ['payment_completed', 'payment_expired', 'refund_completed', 'withdrawal_completed', 'withdrawal_failed'];
  return validEvents.includes(obj.event);
}

/**
 * Parses a webhook payload and returns a type-safe WebhookEvent.
 * Returns null if the payload is invalid.
 *
 * @param payload - The raw request body as a string
 * @returns Parsed WebhookEvent or null if invalid
 *
 * @example
 * ```typescript
 * import { parseWebhook } from 'pague-dev';
 *
 * app.post('/webhook', (req, res) => {
 *   // 1. Verify signature first (implement using your framework)
 *   // const isValid = verifySignature(req.body, req.headers['x-webhook-signature'], secret);
 *
 *   // 2. Parse the webhook payload
 *   const event = parseWebhook(req.body);
 *
 *   if (!event) {
 *     return res.status(400).send('Invalid webhook payload');
 *   }
 *
 *   // 3. Handle the event with full type safety
 *   switch (event.event) {
 *     case 'payment_completed':
 *       // event.data is PaymentCompletedData
 *       console.log('Payment completed:', event.data.transactionId);
 *       console.log('Amount:', event.data.amount);
 *       console.log('Net amount:', event.data.netAmount);
 *       break;
 *
 *     case 'payment_failed':
 *       // event.data is PaymentFailedData
 *       console.log('Payment failed:', event.data.transactionId);
 *       console.log('Reason:', event.data.failureReason);
 *       break;
 *
 *     case 'refund_completed':
 *       // event.data is RefundCompletedData
 *       console.log('Refund completed:', event.data.refundTransactionId);
 *       console.log('Original transaction:', event.data.originalTransactionId);
 *       break;
 *   }
 *
 *   res.status(200).send('OK');
 * });
 * ```
 */
/**
 * Verifies the HMAC-SHA256 signature of a webhook payload.
 *
 * @param payload - The raw request body as a string
 * @param signature - The signature from the `X-Webhook-Signature` header
 * @param secret - Your webhook secret (plain text, before hashing)
 * @returns `true` if the signature is valid, `false` otherwise
 *
 * @example
 * ```typescript
 * import { verifyWebhookSignature, parseWebhook } from '@pague-dev/sdk-node';
 *
 * app.post('/webhook', (req, res) => {
 *   const signature = req.headers['x-webhook-signature'] as string;
 *   const rawBody = req.body; // raw string body
 *
 *   if (!verifyWebhookSignature(rawBody, signature, 'your_webhook_secret')) {
 *     return res.status(401).send('Invalid signature');
 *   }
 *
 *   const event = parseWebhook(rawBody);
 *   // handle event...
 * });
 * ```
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string,
): boolean {
  if (!payload || !signature || !secret) return false;

  try {
    const signingKey = createHash('sha256').update(secret).digest('hex');
    const expected = createHmac('sha256', signingKey).update(payload).digest('hex');

    return timingSafeEqual(
      Buffer.from(expected, 'hex'),
      Buffer.from(signature, 'hex'),
    );
  } catch {
    return false;
  }
}

export function parseWebhook(payload: string): WebhookEvent | null {
  let parsed: unknown;

  try {
    parsed = JSON.parse(payload);
  } catch {
    return null;
  }

  if (!isValidWebhookEvent(parsed)) {
    return null;
  }

  return parsed;
}
