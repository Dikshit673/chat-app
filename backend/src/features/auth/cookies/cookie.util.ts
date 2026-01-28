import { CookieOptions, Request, Response } from 'express';

export class Cookie {
  private readonly name: string;
  private readonly options: CookieOptions;
  constructor(config: ConfigOptions) {
    this.name = config.name;
    this.options = config.options;
  }
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

type ConfigOptions = {
  name: string;
  options: CookieOptions;
};

export class CookieConfig {
  public readonly name: string;
  public readonly options: CookieOptions;
  constructor(config: ConfigOptions) {
    this.name = config.name;
    this.options = config.options;
  }
}
