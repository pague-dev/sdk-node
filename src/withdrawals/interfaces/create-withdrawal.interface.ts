import type { Response } from '../../interfaces';
import type { PixKeyType, Withdrawal } from './withdrawal.interface';

export interface CreateWithdrawalOptions {
  amount: number;
  bankAccountId?: string;
  pixKey?: string;
  pixKeyType?: PixKeyType;
  holderName?: string;
  holderDocument?: string;
  holderDocumentType?: 'cpf' | 'cnpj';
  /**
   * Your own external reference ID for the withdrawal. Returned in the response
   * and forwarded on `withdrawal_completed` / `withdrawal_failed` webhooks.
   * Max 255 chars.
   */
  externalReference?: string;
}

export type CreateWithdrawalResponse = Response<Withdrawal>;
