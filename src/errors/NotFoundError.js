export class NotFoundError extends Error {
  static MESSAGE = "NotFoundError";

  constructor(errMsg) {
    super(errMsg ?? NotFoundError.MESSAGE);
  }
}
