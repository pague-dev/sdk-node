import { BaseResource } from '../common';
import type {
  Charge,
  CreateChargeOptions,
  ListChargesOptions,
} from './interfaces';

export class Charges extends BaseResource<Charge, CreateChargeOptions, ListChargesOptions> {
  protected readonly endpoint = '/charges';
}
