export type Response<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };

export interface ErrorResponse {
  statusCode: number | null;
  error: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp?: string;
  traceId?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface GetOptions {
  query?: Record<string, unknown>;
}

export interface PostOptions {
  query?: Record<string, unknown>;
}
