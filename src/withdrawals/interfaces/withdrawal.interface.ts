export type WithdrawalStatus = 'pending' | 'processing' | 'completed' | 'failed';

export type PixKeyType = 'cpf' | 'cnpj' | 'email' | 'phone' | 'random';

export interface Withdrawal {
  id: string;
  bankAccountId: string | null;
  amount: number;
  feeAmount: number;
  netAmount: number;
  status: WithdrawalStatus;
  snapshotPixKey: string | null;
  snapshotPixKeyType: PixKeyType | null;
  snapshotHolderName: string;
  snapshotHolderDocument: string;
  failureReason: string | null;
  pspReference: string | null;
  createdAt: string;
  processedAt: string | null;
}
