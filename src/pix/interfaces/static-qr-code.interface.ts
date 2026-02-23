import type { Response } from '../../interfaces';
import type { PixStatus } from './pix.interface';

export interface CreateStaticQrCodeOptions {
  amount: number;
  description: string;
  projectId?: string;
  externalReference?: string;
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
