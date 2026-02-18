import jwt from 'jsonwebtoken';

export const jwtLib = {
  sign(
    payload: string | object,
    secretOrPrivateKey: jwt.Secret | jwt.PrivateKey,
    options?: jwt.SignOptions
  ): string {
    return jwt.sign(payload, secretOrPrivateKey, options);
  },
  verify(
    token: string,
    secretOrPublicKey: jwt.Secret | jwt.PublicKey,
    options?: jwt.VerifyOptions
  ): jwt.Jwt | jwt.JwtPayload | string {
    return jwt.verify(token, secretOrPublicKey, options);
  },
};

export type JwtSignOptions = Required<
  Pick<jwt.SignOptions, 'algorithm' | 'expiresIn' | 'header'>
> &
  Pick<
    jwt.SignOptions,
    Exclude<keyof jwt.SignOptions, 'algorithm' | 'expiresIn' | 'header'>
  >;

export type JwtVerifyOptions = Required<Pick<jwt.VerifyOptions, 'algorithms'>> &
  Pick<jwt.VerifyOptions, Exclude<keyof jwt.VerifyOptions, 'algorithms'>>;
