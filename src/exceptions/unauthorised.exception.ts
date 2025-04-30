export class UnauthorisedException extends Error {
  public readonly status = 401;

  constructor(message: string = `Не авторизован!"`) {
    super(message);
  }
}
