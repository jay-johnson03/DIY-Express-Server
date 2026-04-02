const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;

    // Log when request comes in
    console.log(`[${timestamp}] ${method} ${url}`);

    // Track response time
    const start = Date.now();

    // When response finishes
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${timestamp}] ${method} ${url} - ${res.statusCode} (${duration}ms)`);
    });

    // Continue to next middleware
    next();
};

export default logger;