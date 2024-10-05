export class UnauthorizedError extends Error {
  static MESSAGE = "UnauthorizedError";

  constructor(errMsg) {
    super(errMsg ?? UnauthorizedError.MESSAGE);
  }
}
