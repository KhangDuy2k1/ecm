import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException {
  constructor(message: string, statusCode: number) {
    console.log(message);
    throw new HttpException(message, statusCode);
  }
}

export class ForbiddenException extends BaseException {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class NotFoundException extends BaseException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
export class AuthorizationException extends BaseException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
export class ServerErrorException extends BaseException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
