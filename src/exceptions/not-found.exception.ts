export class NotFoundException extends Error {
  public readonly status = 404;

  constructor(message: string = `Не найдено!`) {
    super(message);
  }
}
