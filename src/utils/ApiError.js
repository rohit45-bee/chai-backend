class ApiError extends Error {
    constructor(
        statusCode,
        message = "something went wrong",
        error = [], // Changed from errors to error
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false; // Fixed typo: changed 'sucess' to 'success'
        this.error = error; // Changed from errors to error

        if (stack) {
            this.stack = stack; // Fixed assignment of stack trace
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
