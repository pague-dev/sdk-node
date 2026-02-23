import { CreateOnlyResource } from '../common';
import type { Response } from '../interfaces';
import type {
  CreatePixOptions,
  CreateStaticQrCodeOptions,
  PixCharge,
  StaticQrCode,
} from './interfaces';

export class Pix extends CreateOnlyResource<PixCharge, CreatePixOptions> {
  protected readonly endpoint = '/pix';

  async createStaticQrCode(options: CreateStaticQrCodeOptions): Promise<Response<StaticQrCode>> {
    return this.pdev.post<StaticQrCode>(`${this.endpoint}/qrcode-static`, options);
  }
}
