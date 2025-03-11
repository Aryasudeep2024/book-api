const express = require('express');
const booksRouter = require('./route/booksRoutes'); // ✅ Correct route import

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Use the books router
app.use('/books', booksRouter);

// Root route
app.get('/', (req, res) => {
    res.send("Welcome to the Books API! Use /books to get all books and /books/:id for details.");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
