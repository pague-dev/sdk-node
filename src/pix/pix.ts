import { CreateOnlyResource } from '../common';
import type { CreatePixOptions, PixCharge } from './interfaces';

export class Pix extends CreateOnlyResource<PixCharge, CreatePixOptions> {
  protected readonly endpoint = '/pix';
}
