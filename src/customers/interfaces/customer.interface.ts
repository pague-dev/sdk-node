export type DocumentType = 'cpf' | 'cnpj';

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  documentType: DocumentType;
  document: string;
  createdAt: string;
}
