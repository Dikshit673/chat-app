import { Tokens } from './token.factory.js';
import { SafeUserPayload } from './token.schema.js';
import { Csrf } from './utils/csrf.util.js';
import { DeviceId } from './utils/deviceId.util.js';
import { JwtToken } from './utils/jwt.util.js';

// TODO: move to DI
// token factory service
export class TokenService {
  public accessToken: JwtToken<SafeUserPayload>;
  public refreshToken: JwtToken<SafeUserPayload>;
  public csrfToken: Csrf;
  public deviceIdToken: DeviceId;

  constructor(tokens: Tokens) {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
    this.csrfToken = tokens.csrfToken;
    this.deviceIdToken = tokens.deviceIdToken;
  }
}
