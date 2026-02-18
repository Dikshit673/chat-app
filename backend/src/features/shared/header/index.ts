import { type Request, type Response } from 'express';

export class Header {
  constructor(public readonly name: string) {}
  get(req: Request) {
    const rawToken = req.headers?.[this.name];
    const headerToken =
      typeof rawToken === 'string'
        ? rawToken
        : Array.isArray(rawToken)
          ? rawToken[0]
          : null;
    return headerToken;
  }
  set(res: Response, value: string) {
    res.setHeader(this.name, value);
  }
  clear(res: Response) {
    res.removeHeader(this.name);
  }
}
