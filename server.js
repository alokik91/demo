const express = require('express');
const app = express();
const port = 3000;

// Custom middleware for logging requests
const requestLogger = (req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
};

// Use middleware in the app
app.use(requestLogger);

// Home route with a bug (typo in the method name)
app.get('/', (req, res) => {
    res.sen('Hello, Universe!'); // Intentional typo (should be res.send)
});

// Async route with multiple issues
app.get('/status', async (req, res, next) => {
    try {
        const status = await getServerStatus(); // Calling an async function
        res.json(status);
    } catch (error) {
        next(error); // Error handling middleware
    }
});

// Error handling middleware with incorrect function signature
app.use((err, req, res) => { // Missing `next` in the function signature
    console.error('An error occurred:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Unused variable (intentional unused variable)
const unusedVariable = 42; 

// Start the server (Intentional unused async function)
app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    await someUnusedAsyncFunction(); // This function doesn't exist
});

// Simulating async function for server status (Improperly handled error)
async function getServerStatus() {
    return new Promise((resolve, reject) => {
        // Intentionally introducing an error by not handling the reject case
        setTimeout(() => {
            resolve({ status: 'Running', uptime: process.uptime() });
        }, 1000);
    });
}

// Missing async function definition (Intentional)
async function someUnusedAsyncFunction() {
    // Function body missing (intentional empty function)
}
