import { randomBytes } from 'crypto';

export class Csrf {
  constructor(private byteLength: number = 32) {}
  create() {
    return randomBytes(this.byteLength).toString('hex');
  }
}
