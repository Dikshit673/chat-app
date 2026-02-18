import { type CookieOptions, type Request, type Response } from 'express';

export class Cookie {
  constructor(
    public readonly name: string,
    public readonly options: CookieOptions
  ) {}
  get(req: Request) {
    const value = req.cookies?.[this.name] as string | undefined;
    if (!value) return null;
    return value;
  }
  set(res: Response, value: string) {
    res.cookie(this.name, value, this.options);
  }
  clear(res: Response) {
    res.clearCookie(this.name, this.options);
  }
}
