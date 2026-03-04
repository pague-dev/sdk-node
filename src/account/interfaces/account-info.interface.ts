export type AccountStatus = 'approved' | 'pending' | 'pending_documents' | 'pending_approval' | 'rejected' | 'suspended';
export type CompanyStatus = 'pending' | 'active' | 'suspended' | 'blocked';

export interface BalanceAmount {
  amount: number;
  amountFormatted: number;
}

export interface AccountDetail {
  id: string;
  status: AccountStatus;
}

export interface CompanyDetail {
  razaoSocial: string;
  nomeFantasia?: string;
  cnpj: string;
  email: string;
  phone: string;
  status: CompanyStatus;
}

export interface BalanceDetail {
  available: BalanceAmount;
  promotional: BalanceAmount;
  total: BalanceAmount;
  currency: string;
  updatedAt: string;
}

export interface AccountInfo {
  account: AccountDetail;
  company: CompanyDetail | null;
  balance: BalanceDetail;
}
