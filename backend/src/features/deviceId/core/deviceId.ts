import { cryptoLib } from '@/lib/crypto/index.js';

export class DeviceId {
  constructor() {}
  create() {
    return cryptoLib.randomUUID();
  }
}
