import ExtendableError from './ExtendableError';

export class HttpError extends ExtendableError {
  constructor(status = 500, message = any) {
    super();
    this.name = 'HttpError';
    this.status = status;
    this.message = message;
  }
}
