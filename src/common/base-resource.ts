import type { PaginatedResponse, Response } from '../interfaces';
import type { Pdev } from '../pdev';
import { buildPaginationQuery } from './utils/build-pagination-query';

/**
 * Base class for API resources that follow CRUD patterns.
 * Provides common create, list, and get operations.
 */
export abstract class BaseResource<
  TEntity,
  TCreateOptions = never,
  TListOptions extends object = object,
> {
  protected abstract readonly endpoint: string;

  constructor(protected readonly pdev: Pdev) {}

  /**
   * Create a new entity
   */
  async create(options: TCreateOptions): Promise<Response<TEntity>> {
    return this.pdev.post<TEntity>(this.endpoint, options);
  }

  /**
   * List entities with pagination
   */
  async list(options: TListOptions = {} as TListOptions): Promise<Response<PaginatedResponse<TEntity>>> {
    const queryString = buildPaginationQuery(options);
    const path = queryString ? `${this.endpoint}?${queryString}` : this.endpoint;
    return this.pdev.get<PaginatedResponse<TEntity>>(path);
  }

  /**
   * Get a single entity by ID
   */
  async get(id: string): Promise<Response<TEntity>> {
    return this.pdev.get<TEntity>(`${this.endpoint}/${id}`);
  }
}

/**
 * Base class for resources that only support create operations
 */
export abstract class CreateOnlyResource<TEntity, TCreateOptions> {
  protected abstract readonly endpoint: string;

  constructor(protected readonly pdev: Pdev) {}

  async create(options: TCreateOptions): Promise<Response<TEntity>> {
    return this.pdev.post<TEntity>(this.endpoint, options);
  }
}

/**
 * Base class for resources that only support get operations
 */
export abstract class GetOnlyResource<TEntity> {
  protected abstract readonly endpoint: string;

  constructor(protected readonly pdev: Pdev) {}

  async get(id: string): Promise<Response<TEntity>> {
    return this.pdev.get<TEntity>(`${this.endpoint}/${id}`);
  }
}
