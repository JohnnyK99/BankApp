import { Result } from './result.model';

export class BaseResponse<T> implements Result<T> {
  succeeded: boolean;
  messages: string[];
  data: T;

  constructor(result: Result<T>) {
    this.succeeded = result.succeeded;
    this.messages = result.messages;
    this.data = result.data;
  }
}
