export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type Meta = string | object;

export class Logger {
  constructor(
    private readonly name: string,
    private readonly level: LogLevel = 'info'
  ) {}

  debug(message: string, meta?: Meta) {
    this.write('debug', message, meta);
  }

  info(message: string, meta?: Meta) {
    this.write('info', message, meta);
  }

  warn(message: string, meta?: Meta) {
    this.write('warn', message, meta);
  }

  error(message: string, meta?: Meta) {
    this.write('error', message, meta);
  }

  private write(level: LogLevel, message: string, meta?: Meta) {
    if (!this.shouldLog(level)) return;

    const log = {
      time: new Date().toISOString(),
      level,
      scope: this.name,
      message,
      ...(meta && { meta }),
    };

    console[this.mapConsole(level)](JSON.stringify(log));
  }

  private shouldLog(level: LogLevel) {
    const order: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    return order.indexOf(level) >= order.indexOf(this.level);
  }

  private mapConsole(level: LogLevel) {
    return level === 'debug' ? 'log' : level;
  }
}
