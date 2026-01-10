import type { PaginatedResponse, PaginationOptions, Response } from '../../interfaces';
import type { Charge, ChargeStatus } from './charge.interface';

export interface ListChargesOptions extends PaginationOptions {
  search?: string;
  status?: ChargeStatus;
  projectId?: string;
}

export type ListChargesResponse = Response<PaginatedResponse<Charge>>;
