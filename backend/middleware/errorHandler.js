/**
 * Error handling middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
    // Log the error
    console.error(err);
  
    // Determine error status code
    const statusCode = err.statusCode || 500;
    
    // Prepare error response
    const errorResponse = {
      success: false,
      error: {
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
      }
    };
  
    // Mongoose validation error handling
    if (err.name === 'ValidationError') {
      errorResponse.error.message = Object.values(err.errors)
        .map(error => error.message)
        .join(', ');
      errorResponse.statusCode = 400;
    }
  
    // Mongoose duplicate key error
    if (err.code === 11000) {
      errorResponse.error.message = 'Duplicate key error';
      errorResponse.statusCode = 409;
    }
  
    // Send error response
    res.status(statusCode).json(errorResponse);
  };
  
  module.exports = errorHandler;