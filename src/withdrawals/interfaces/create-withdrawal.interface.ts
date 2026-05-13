import type { Response } from '../../interfaces';
import type { PixKeyType, Withdrawal } from './withdrawal.interface';

export interface CreateWithdrawalOptions {
  /**
   * Gross amount in BRL debited from your balance. Recipient receives
   * `amount - feeAmount`. Provide either `amount` OR `netAmount`, never both.
   */
  amount?: number;
  /**
   * Net amount in BRL the recipient should receive. The API derives the gross
   * automatically (`gross = netAmount + feeAmount`) and debits that from your
   * balance. Provide either `amount` OR `netAmount`, never both.
   */
  netAmount?: number;
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
