

const express = require('express');
const router = express.Router();
const books = require('../books'); 


router.get('/', (req, res) => {
    res.json(books);
});

router.get('/:id', (req, res) => {
    const bookID = parseInt(req.params.id, 10);
    const book = books.find(b => b.id === bookID);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
});

module.exports = router;
