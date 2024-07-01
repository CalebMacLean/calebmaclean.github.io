/** ExpressError extends the built-in JS Error, but accepts a status when instantiated. */
class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

/** NotFoundError: 404 Not Found */
class NotFoundError extends ExpressError {
    constructor(message = "Not Found"){
        super(message, 404);
    }
}

/** UnauthorizedError: 401 Unauthorized */
class UnauthorizedError extends ExpressError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

/** BadRequestError: 400 Bad Request */
class BadRequestError extends ExpressError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}

/** ForbiddenError: 403 Bad Request */
class ForbiddenError extends ExpressError {
    constructor(message = "Bad Request") {
        super(message, 403);
    }
}

// Exports
module.exports = {
    ExpressError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ForbiddenError
}