import { describe, it, expect } from 'vitest';
import { parseWebhook } from './verify';
import type { PaymentCompletedEvent } from './interfaces';

describe('parseWebhook', () => {
  const validPayload: PaymentCompletedEvent = {
    event: 'payment_completed',
    eventId: 'txn_abc123',
    timestamp: '2024-01-15T10:30:00.000Z',
    data: {
      transactionId: 'txn_abc123',
      amount: 100.5,
      feeAmount: 0.99,
      netAmount: 99.51,
      currency: 'BRL',
      paymentMethod: 'pix',
      status: 'completed',
      completedAt: '2024-01-15T10:30:00.000Z',
    },
  };

  it('should parse a valid payment_completed event', () => {
    const payload = JSON.stringify(validPayload);
    const event = parseWebhook(payload);

    expect(event).not.toBeNull();
    expect(event?.event).toBe('payment_completed');
    expect(event?.eventId).toBe('txn_abc123');
    expect(event?.data).toEqual(validPayload.data);
  });

  it('should parse a valid payment_failed event', () => {
    const failedPayload = {
      event: 'payment_failed',
      eventId: 'txn_xyz789',
      timestamp: '2024-01-15T10:35:00.000Z',
      data: {
        transactionId: 'txn_xyz789',
        amount: 50.0,
        currency: 'BRL',
        paymentMethod: 'pix',
        status: 'failed',
        failedAt: '2024-01-15T10:35:00.000Z',
        failureReason: 'expired',
      },
    };

    const event = parseWebhook(JSON.stringify(failedPayload));

    expect(event).not.toBeNull();
    expect(event?.event).toBe('payment_failed');
    if (event?.event === 'payment_failed') {
      expect(event.data.failureReason).toBe('expired');
    }
  });

  it('should parse a valid refund_completed event', () => {
    const refundPayload = {
      event: 'refund_completed',
      eventId: 'txn_ref456',
      timestamp: '2024-01-15T11:00:00.000Z',
      data: {
        refundTransactionId: 'txn_ref456',
        originalTransactionId: 'txn_abc123',
        amount: 100.5,
        feeAmount: 0,
        currency: 'BRL',
        status: 'completed',
        refundedAt: '2024-01-15T11:00:00.000Z',
      },
    };

    const event = parseWebhook(JSON.stringify(refundPayload));

    expect(event).not.toBeNull();
    expect(event?.event).toBe('refund_completed');
    if (event?.event === 'refund_completed') {
      expect(event.data.originalTransactionId).toBe('txn_abc123');
    }
  });

  it('should return null for invalid JSON', () => {
    const event = parseWebhook('not valid json');
    expect(event).toBeNull();
  });

  it('should return null for missing event field', () => {
    const event = parseWebhook(JSON.stringify({ eventId: '123', timestamp: '2024-01-01', data: {} }));
    expect(event).toBeNull();
  });

  it('should return null for missing eventId field', () => {
    const event = parseWebhook(JSON.stringify({ event: 'payment_completed', timestamp: '2024-01-01', data: {} }));
    expect(event).toBeNull();
  });

  it('should return null for missing data field', () => {
    const event = parseWebhook(JSON.stringify({ event: 'payment_completed', eventId: '123', timestamp: '2024-01-01' }));
    expect(event).toBeNull();
  });

  it('should return null for unknown event type', () => {
    const event = parseWebhook(JSON.stringify({ event: 'unknown_event', eventId: '123', timestamp: '2024-01-01', data: {} }));
    expect(event).toBeNull();
  });

  it('should return null for non-object payload', () => {
    expect(parseWebhook(JSON.stringify('string'))).toBeNull();
    expect(parseWebhook(JSON.stringify(123))).toBeNull();
    expect(parseWebhook(JSON.stringify(null))).toBeNull();
    expect(parseWebhook(JSON.stringify([]))).toBeNull();
  });
});
