export class BadRequestException extends Error {
  public readonly status = 400;

  constructor(message: string = `Неправильно выполнен запрос`) {
    super(message);
  }
}
