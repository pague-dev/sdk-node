import { beforeEach, describe, expect, it } from 'vitest';
import { Pdev } from '../pdev';

describe('Customers', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('create', () => {
    it('creates a customer', async () => {
      const mockResponse = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'João da Silva',
        email: 'joao@example.com',
        phone: '+5511999998888',
        documentType: 'cpf',
        document: '***456789**',
        createdAt: '2025-12-15T22:00:00.000Z',
      };

      fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 201 });

      const pdev = new Pdev('pd_test_xxx');
      const result = await pdev.customers.create({
        name: 'João da Silva',
        document: '12345678909',
        email: 'joao@example.com',
        phone: '+5511999998888',
      });

      expect(result.data).toEqual(mockResponse);
      expect(result.error).toBeNull();
    });
  });

  describe('list', () => {
    it('lists customers', async () => {
      const mockResponse = {
        items: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            name: 'João da Silva',
            email: 'joao@example.com',
            phone: '+5511999998888',
            documentType: 'cpf',
            document: '***456789**',
            createdAt: '2025-12-15T22:00:00.000Z',
          },
        ],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      };

      fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

      const pdev = new Pdev('pd_test_xxx');
      const result = await pdev.customers.list({ page: 1, limit: 20 });

      expect(result.data).toEqual(mockResponse);
      expect(result.error).toBeNull();
    });

    it('lists customers with search', async () => {
      const mockResponse = {
        items: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      };

      fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

      const pdev = new Pdev('pd_test_xxx');
      const result = await pdev.customers.list({ search: 'joao' });

      expect(result.data).toEqual(mockResponse);
      expect(result.error).toBeNull();
      expect(fetchMock.mock.calls[0][0]).toContain('search=joao');
    });
  });
});
