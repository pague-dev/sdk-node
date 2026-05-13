export type BalanceBlockStatus = 'awaiting_response' | 'defended' | 'approved' | 'rejected';

export type BalanceBlockType = 'med' | 'judicial' | 'administrative';

export interface BalanceBlock {
  id: string;
  transactionId: string;
  externalReference: string | null;
  e2eId: string | null;
  amount: number;
  status: BalanceBlockStatus;
  blockType: BalanceBlockType;
  referenceNumber: string;
  reason: string;
  resolutionReason: string | null;
  resolvedAt: string | null;
  createdAt: string;
}
