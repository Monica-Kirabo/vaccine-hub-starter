class ExpressError extends Error {
    constructor(message, status) {
      super();
  
      this.message = message;
      this.status = status;
    }
  }
  class BadRequestError extends ExpressError {
    constructor() {
      super("Bad request", 400);
    }
  }
  class NotFoundError extends ExpressError {
    constructor() {
      super("Not FOUND", 404);
    }
  }
  class unauthorizedError extends ExpressError {
    constructor() {
      super("unauthorized", 401);
    }
  }
  
  module.exports = { BadRequestError, ExpressError, NotFoundError, unauthorizedError };