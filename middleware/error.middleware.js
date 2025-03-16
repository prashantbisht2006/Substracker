const errorMiddleware = (err, req, res, next) => {
    try {
        let error = Object.assign(new Error(), err); // Properly copy the error object
        error.message = err.message || "Server Error";

        console.error(err);

        // Mongoose: Invalid ObjectId error
        if (err.name === 'CastError') {
            error = new Error("Resource not found");
            error.statusCode = 404;
        }

        // Mongoose: Duplicate Key error
        if (err.code === 11000) {
            error = new Error("Duplicate field value entered");
            error.statusCode = 400;
        }

        // Mongoose: Validation Error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message).join(', ');
            error = new Error(message);
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Server Error"
        });

    } catch (err) {
        next(err); // Pass unexpected errors to the next middleware
    }
};

// ✅ Use ES module export
export default errorMiddleware;
