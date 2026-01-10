import { beforeEach, describe, expect, it } from 'vitest';
import { Pdev } from '../pdev';

describe('Pix', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('create', () => {
    it('creates a PIX charge', async () => {
      const mockResponse = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        status: 'pending',
        amount: 150.75,
        currency: 'BRL',
        pixCopyPaste: '00020126580014br.gov.bcb.pix0136...',
        expiresAt: '2024-12-31T23:59:59Z',
        externalReference: 'pedido-12345',
        customerId: '550e8400-e29b-41d4-a716-446655440001',
        createdAt: '2025-12-15T22:00:00.000Z',
      };

      fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 201 });

      const pdev = new Pdev('pd_test_xxx');
      const result = await pdev.pix.create({
        amount: 150.75,
        description: 'Pagamento do pedido #12345',
        customer: {
          name: 'João da Silva',
          document: '12345678909',
        },
        expiresIn: 3600,
        externalReference: 'pedido-12345',
      });

      expect(result.data).toEqual(mockResponse);
      expect(result.error).toBeNull();
    });

    it('returns error on validation failure', async () => {
      const mockError = {
        statusCode: 400,
        error: 'BadRequest',
        message: 'amount must be a positive number',
      };

      fetchMock.mockResponseOnce(JSON.stringify(mockError), { status: 400 });

      const pdev = new Pdev('pd_test_xxx');
      const result = await pdev.pix.create({
        amount: -10,
        customer: {
          name: 'João da Silva',
          document: '12345678909',
        },
      });

      expect(result.data).toBeNull();
      expect(result.error).toEqual(mockError);
    });
  });
});
