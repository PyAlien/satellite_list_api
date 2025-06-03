export class ConflictException extends Error {
  public readonly status = 409;

  constructor(message: string = `Конфликт"`) {
    super(message);
  }
}
