import { beforeEach, describe, expect, it } from 'vitest';
import { Pdev } from '../pdev';

describe('Projects', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('create', () => {
    it('creates a project', async () => {
      const mockResponse = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Minha Loja',
        description: 'Loja virtual de eletrônicos',
        color: '#3B82F6',
        logoUrl: 'https://example.com/logo.png',
        createdAt: '2025-12-15T22:00:00.000Z',
      };

      fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 201 });

      const pdev = new Pdev('pd_test_xxx');
      const result = await pdev.projects.create({
        name: 'Minha Loja',
        description: 'Loja virtual de eletrônicos',
        color: '#3B82F6',
        logoUrl: 'https://example.com/logo.png',
      });

      expect(result.data).toEqual(mockResponse);
      expect(result.error).toBeNull();
    });
  });

  describe('list', () => {
    it('lists projects', async () => {
      const mockResponse = {
        items: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            name: 'Minha Loja',
            description: 'Loja virtual de eletrônicos',
            color: '#3B82F6',
            logoUrl: 'https://example.com/logo.png',
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
      const result = await pdev.projects.list();

      expect(result.data).toEqual(mockResponse);
      expect(result.error).toBeNull();
    });

    it('lists projects with sorting', async () => {
      const mockResponse = {
        items: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      };

      fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

      const pdev = new Pdev('pd_test_xxx');
      const result = await pdev.projects.list({ sortBy: 'name', sortOrder: 'asc' });

      expect(result.data).toEqual(mockResponse);
      expect(result.error).toBeNull();
      expect(fetchMock.mock.calls[0][0]).toContain('sortBy=name');
      expect(fetchMock.mock.calls[0][0]).toContain('sortOrder=asc');
    });
  });
});
