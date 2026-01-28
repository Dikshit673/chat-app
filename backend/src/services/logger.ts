export class LoggerService {
  log(message: string) {
    console.log(message);
  }
  info(message: string) {
    console.info(message);
  }
  error(message: string) {
    console.error(message);
  }
}
