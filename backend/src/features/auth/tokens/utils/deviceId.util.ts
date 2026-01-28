import { randomUUID } from 'crypto';

export class DeviceId {
  constructor() {}
  create() {
    return randomUUID();
  }
}
