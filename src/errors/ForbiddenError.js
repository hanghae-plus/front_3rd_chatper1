export class ForbiddenError extends Error {
  static MESSAGE = "ForbiddenError";

  constructor(errMsg) {
    super(errMsg ?? ForbiddenError.MESSAGE);
  }
}
