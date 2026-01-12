import { describe, it, expect } from 'vitest';
import { parseWebhook } from './verify';
import type { PaymentCompletedEvent } from './interfaces';

describe('parseWebhook', () => {
  const validPayload: PaymentCompletedEvent = {
    event: 'payment_completed',
    eventId: 'a0b78f10-c7f4-4f5d-98dd-3e36eafeb812',
    timestamp: '2026-01-11T19:03:28.280Z',
    data: {
      transactionId: 'a0b78f10-c7f4-4f5d-98dd-3e36eafeb812',
      environment: 'sandbox',
      amount: 100.21,
      feeAmount: 0.5,
      netAmount: 99.71,
      currency: 'BRL',
      paymentMethod: 'pix',
      status: 'completed',
      completedAt: '2026-01-11T19:03:28.277Z',
      externalReference: 'pedido-12345',
    },
  };

  it('should parse a valid payment_completed event', () => {
    const payload = JSON.stringify(validPayload);
    const event = parseWebhook(payload);

    expect(event).not.toBeNull();
    expect(event?.event).toBe('payment_completed');
    expect(event?.eventId).toBe('a0b78f10-c7f4-4f5d-98dd-3e36eafeb812');
    expect(event?.data).toEqual(validPayload.data);
  });

  it('should parse a valid payment_completed event with externalReference', () => {
    const payload = JSON.stringify(validPayload);
    const event = parseWebhook(payload);

    expect(event).not.toBeNull();
    if (event?.event === 'payment_completed') {
      expect(event.data.externalReference).toBe('pedido-12345');
    }
  });

  it('should parse a valid refund_completed event', () => {
    const refundPayload = {
      event: 'refund_completed',
      eventId: 'c92d45e6-8b33-4f12-a789-2e56f8901def',
      timestamp: '2026-01-11T19:22:15.456Z',
      data: {
        refundTransactionId: 'c92d45e6-8b33-4f12-a789-2e56f8901def',
        originalTransactionId: 'a0b78f10-c7f4-4f5d-98dd-3e36eafeb812',
        environment: 'sandbox',
        amount: 50.0,
        feeAmount: 0.25,
        netAmount: 49.75,
        currency: 'BRL',
        status: 'completed',
        completedAt: '2026-01-11T19:22:15.400Z',
      },
    };

    const event = parseWebhook(JSON.stringify(refundPayload));

    expect(event).not.toBeNull();
    expect(event?.event).toBe('refund_completed');
    if (event?.event === 'refund_completed') {
      expect(event.data.originalTransactionId).toBe('a0b78f10-c7f4-4f5d-98dd-3e36eafeb812');
      expect(event.data.netAmount).toBe(49.75);
    }
  });

  it('should parse a valid withdrawal_completed event', () => {
    const withdrawalPayload = {
      event: 'withdrawal_completed',
      eventId: 'e73775b5-70ee-4bad-be4c-4acff9890e27',
      timestamp: '2026-01-11T19:08:21.953Z',
      data: {
        withdrawalId: 'e73775b5-70ee-4bad-be4c-4acff9890e27',
        environment: 'sandbox',
        amount: 500.0,
        feeAmount: 2.5,
        netAmount: 497.5,
        currency: 'BRL',
        status: 'completed',
        completedAt: '2026-01-11T19:08:21.939Z',
      },
    };

    const event = parseWebhook(JSON.stringify(withdrawalPayload));

    expect(event).not.toBeNull();
    expect(event?.event).toBe('withdrawal_completed');
    if (event?.event === 'withdrawal_completed') {
      expect(event.data.withdrawalId).toBe('e73775b5-70ee-4bad-be4c-4acff9890e27');
      expect(event.data.netAmount).toBe(497.5);
    }
  });

  it('should parse a valid withdrawal_failed event', () => {
    const withdrawalFailedPayload = {
      event: 'withdrawal_failed',
      eventId: 'b84f12c3-9a21-4e67-bc88-1d45f6789abc',
      timestamp: '2026-01-11T19:15:42.123Z',
      data: {
        withdrawalId: 'b84f12c3-9a21-4e67-bc88-1d45f6789abc',
        environment: 'sandbox',
        amount: 1000.0,
        feeAmount: 5.0,
        netAmount: 995.0,
        currency: 'BRL',
        status: 'failed',
        failedAt: '2026-01-11T19:15:42.100Z',
        failureReason: 'insufficient_funds',
      },
    };

    const event = parseWebhook(JSON.stringify(withdrawalFailedPayload));

    expect(event).not.toBeNull();
    expect(event?.event).toBe('withdrawal_failed');
    if (event?.event === 'withdrawal_failed') {
      expect(event.data.withdrawalId).toBe('b84f12c3-9a21-4e67-bc88-1d45f6789abc');
      expect(event.data.failureReason).toBe('insufficient_funds');
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
