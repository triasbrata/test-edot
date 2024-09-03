export class Exception extends Error {
  /**
   *
   */
  constructor(
    message: string,
    readonly code: number,
  ) {
    super(message);
  }
}
