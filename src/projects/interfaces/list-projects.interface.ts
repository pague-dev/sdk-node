import type { PaginatedResponse, PaginationOptions, Response } from '../../interfaces';
import type { Project } from './project.interface';

export type SortBy = 'createdAt' | 'updatedAt' | 'name';
export type SortOrder = 'asc' | 'desc';

export interface ListProjectsOptions extends PaginationOptions {
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}

export type ListProjectsResponse = Response<PaginatedResponse<Project>>;
