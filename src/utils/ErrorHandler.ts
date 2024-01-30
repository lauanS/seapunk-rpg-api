export class ElegantError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);

    this.statusCode = statusCode;
  }
}

export class BadRequestError extends ElegantError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedError extends ElegantError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class NotFoundError extends ElegantError {
  constructor(message: string) {
    super(message, 404);
  }
}
