import { beforeEach, describe, expect, it } from 'vitest';
import { Pdev } from '../pdev';

describe('Transactions', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('get', () => {
    it('gets a transaction by id', async () => {
      const mockTransaction = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        status: 'completed',
        type: 'payment',
        paymentMethod: 'pix',
        amount: 150.75,
        currency: 'BRL',
        description: 'Pagamento do pedido #12345',
        externalReference: 'pedido-12345',
        customerId: '550e8400-e29b-41d4-a716-446655440001',
        projectId: '550e8400-e29b-41d4-a716-446655440002',
        metadata: {
          orderId: '12345',
          source: 'website',
        },
        pixCopyPaste: '00020126580014br.gov.bcb.pix0136...',
        paidAt: '2025-12-15T22:00:00.000Z',
        createdAt: '2025-12-15T21:00:00.000Z',
        updatedAt: '2025-12-15T22:00:00.000Z',
      };

      fetchMock.mockResponseOnce(JSON.stringify(mockTransaction), { status: 200 });

      const pdev = new Pdev('pd_test_xxx');
      const result = await pdev.transactions.get('550e8400-e29b-41d4-a716-446655440000');

      expect(result.data).toEqual(mockTransaction);
      expect(result.error).toBeNull();
    });

    it('returns error for not found', async () => {
      const mockError = {
        statusCode: 404,
        error: 'NotFound',
        message: 'Resource with id 550e8400-e29b-41d4-a716-446655440000 not found',
      };

      fetchMock.mockResponseOnce(JSON.stringify(mockError), { status: 404 });

      const pdev = new Pdev('pd_test_xxx');
      const result = await pdev.transactions.get('550e8400-e29b-41d4-a716-446655440000');

      expect(result.data).toBeNull();
      expect(result.error).toEqual(mockError);
    });
  });
});
