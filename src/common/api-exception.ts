export abstract class BaseApiException extends Error {
  constructor(
    public code: number,
    message: string,
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestException extends BaseApiException {
  constructor(message: string = "Bad Request") {
    super(400, message);
  }
}

export class UnauthorizedException extends BaseApiException {
  constructor(message: string = "Unauthorized") {
    super(401, message);
  }
}

export class ForbiddenException extends BaseApiException {
  constructor(message: string = "Forbidden") {
    super(403, message);
  }
}

export class NotFoundException extends BaseApiException {
  constructor(message: string = "Not Found") {
    super(404, message);
  }
}

export class InternalServerErrorException extends BaseApiException {
  constructor(message: string = "Internal Server Error") {
    super(500, message);
  }
}
