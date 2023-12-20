class errorHandler extends Error {
  constructor(name, description, options) {
    if (options?.cause !== undefined && options?.cause !== null) {
      super(description, { cause: options.cause });
    } else {
      super(description);
    }
    this.name = name;
    this.statusCode = options?.statusCode ?? 500;
    Error.captureStackTrace(this);
  }
}

module.exports = errorHandler;