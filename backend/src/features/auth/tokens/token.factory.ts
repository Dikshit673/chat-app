import { createTokenConfigs } from './token.config.js';
import { Csrf } from './utils/csrf.util.js';
import { DeviceId } from './utils/deviceId.util.js';
import { JwtToken } from './utils/jwt.util.js';

export function createTokens() {
  const configs = createTokenConfigs();
  return {
    accessToken: new JwtToken(configs.accessToken),
    refreshToken: new JwtToken(configs.refreshToken),
    csrfToken: new Csrf(),
    deviceIdToken: new DeviceId(),
  };
}

export type Tokens = ReturnType<typeof createTokens>;
