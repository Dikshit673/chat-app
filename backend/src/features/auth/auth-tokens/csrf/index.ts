import { cryptoLib } from '@/lib/crypto/index.js';

export class CsrfToken {
  constructor(private byteLength: number = 32) {}
  createToken() {
    return cryptoLib.randomBytes(this.byteLength).toString('hex');
  }
}
