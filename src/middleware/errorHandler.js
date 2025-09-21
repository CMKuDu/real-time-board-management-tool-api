const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Firebase specific errors
    if (err.code && err.code.startsWith('auth/')) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    // JWT specific errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token expired'
        });
    }

    // Default error
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
};

module.exports = errorHandler;