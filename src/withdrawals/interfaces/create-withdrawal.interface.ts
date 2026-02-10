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
}

export type CreateWithdrawalResponse = Response<Withdrawal>;
