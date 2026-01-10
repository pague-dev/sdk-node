import { Charges } from './charges/charges';
import { config } from './config';
import { Customers } from './customers/customers';
import type { ErrorResponse, GetOptions, PostOptions, Response } from './interfaces';
import { Pix } from './pix/pix';
import { Projects } from './projects/projects';
import { Transactions } from './transactions/transactions';

export class Pdev {
  readonly key: string;
  private readonly baseUrl: string;
  private readonly headers: Headers;

  readonly pix: Pix;
  readonly customers: Customers;
  readonly projects: Projects;
  readonly charges: Charges;
  readonly transactions: Transactions;

  constructor(key?: string) {
    if (!key) {
      if (typeof process !== 'undefined' && process.env) {
        this.key = process.env.PDEV_API_KEY || '';
      } else {
        this.key = '';
      }

      if (!this.key) {
        throw new Error(
          'Missing API key. Pass it to the constructor `new Pdev("pd_live_xxx")` or set the PDEV_API_KEY environment variable.',
        );
      }
    } else {
      this.key = key;
    }

    this.baseUrl = config.baseUrl;

    this.headers = new Headers({
      'X-API-Key': this.key,
      'Content-Type': 'application/json',
    });

    this.pix = new Pix(this);
    this.customers = new Customers(this);
    this.projects = new Projects(this);
    this.charges = new Charges(this);
    this.transactions = new Transactions(this);
  }

  async post<T>(path: string, body?: unknown, options: PostOptions = {}): Promise<Response<T>> {
    const url = this.buildUrl(path, options.query);

    return this.fetchRequest<T>(url, {
      method: 'POST',
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async get<T>(path: string, options: GetOptions = {}): Promise<Response<T>> {
    const url = this.buildUrl(path, options.query);

    return this.fetchRequest<T>(url, {
      method: 'GET',
      headers: this.headers,
    });
  }

  private buildUrl(path: string, query?: Record<string, unknown>): string {
    let url = `${this.baseUrl}${path}`;

    if (query) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined && value !== null) {
          searchParams.set(key, String(value));
        }
      }
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    return url;
  }

  private async fetchRequest<T>(url: string, options: RequestInit): Promise<Response<T>> {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        try {
          const rawError = await response.text();
          const errorData = JSON.parse(rawError) as ErrorResponse;
          return {
            data: null,
            error: errorData,
          };
        } catch {
          return {
            data: null,
            error: {
              statusCode: response.status,
              error: 'UnknownError',
              message: 'An unexpected error occurred',
            },
          };
        }
      }

      const data = (await response.json()) as T;
      return {
        data,
        error: null,
      };
    } catch {
      return {
        data: null,
        error: {
          statusCode: null,
          error: 'NetworkError',
          message: 'Unable to fetch data. The request could not be resolved.',
        },
      };
    }
  }
}
