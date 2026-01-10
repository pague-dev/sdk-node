import { beforeEach, describe, expect, it } from 'vitest';
import { Pdev } from '../pdev';

describe('Charges', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  const mockCharge = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    projectId: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Produto Premium',
    description: 'Pagamento referente ao produto premium',
    amount: 99.9,
    currency: 'BRL',
    status: 'active',
    slug: 'produto-premium-2024',
    url: 'https://pay.pague.dev/produto-premium-2024',
    paymentMethods: ['pix'],
    maxInstallments: 6,
    notifications: ['email'],
    allowCoupons: false,
    paymentsCount: 5,
    totalCollected: 495,
    createdAt: '2025-12-15T22:00:00.000Z',
  };

  describe('create', () => {
    it('creates a charge', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockCharge), { status: 201 });

      const pdev = new Pdev('pd_test_xxx');
      const result = await pdev.charges.create({
        projectId: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Produto Premium',
        description: 'Pagamento referente ao produto premium',
        amount: 99.9,
        paymentMethods: ['pix'],
      });

      expect(result.data).toEqual(mockCharge);
      expect(result.error).toBeNull();
    });
  });

  describe('list', () => {
    it('lists charges', async () => {
      const mockResponse = {
        items: [mockCharge],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      };

      fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

      const pdev = new Pdev('pd_test_xxx');
      const result = await pdev.charges.list();

      expect(result.data).toEqual(mockResponse);
      expect(result.error).toBeNull();
    });

    it('lists charges with filters', async () => {
      const mockResponse = {
        items: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      };

      fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

      const pdev = new Pdev('pd_test_xxx');
      const result = await pdev.charges.list({
        status: 'active',
        projectId: '550e8400-e29b-41d4-a716-446655440001',
      });

      expect(result.data).toEqual(mockResponse);
      expect(result.error).toBeNull();
      expect(fetchMock.mock.calls[0][0]).toContain('status=active');
      expect(fetchMock.mock.calls[0][0]).toContain(
        'projectId=550e8400-e29b-41d4-a716-446655440001',
      );
    });
  });

  describe('get', () => {
    it('gets a charge by id', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockCharge), { status: 200 });

      const pdev = new Pdev('pd_test_xxx');
      const result = await pdev.charges.get('550e8400-e29b-41d4-a716-446655440000');

      expect(result.data).toEqual(mockCharge);
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
      const result = await pdev.charges.get('550e8400-e29b-41d4-a716-446655440000');

      expect(result.data).toBeNull();
      expect(result.error).toEqual(mockError);
    });
  });
});
