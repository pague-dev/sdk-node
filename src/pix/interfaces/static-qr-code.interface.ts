import type { Response } from '../../interfaces';
import type { PixStatus } from './pix.interface';

export interface StaticQrCodeTransaction {
  description: string;
  amount: number;
  comment?: string;
  externalReference?: string;
}

export interface CreateStaticQrCodeOptions {
  transaction: StaticQrCodeTransaction;
  projectId?: string;
  metadata?: Record<string, unknown>;
}

export interface StaticQrCode {
  id: string;
  status: PixStatus;
  amount: number;
  currency: string;
  pixCopyPaste: string;
  qrCodeBase64?: string;
  externalReference?: string;
  createdAt: string;
}

export type CreateStaticQrCodeResponse = Response<StaticQrCode>;
