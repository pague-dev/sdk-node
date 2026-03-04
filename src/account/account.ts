import type { Response } from '../interfaces';
import type { Pdev } from '../pdev';
import type { AccountInfo } from './interfaces';

export class Account {
  private readonly endpoint = '/account';

  constructor(private readonly pdev: Pdev) {}

  async get(): Promise<Response<AccountInfo>> {
    return this.pdev.get<AccountInfo>(this.endpoint);
  }
}
