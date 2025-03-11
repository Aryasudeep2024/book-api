const express = require('express');
const router = express.Router();
const books = require('../books'); // ✅ Ensure this path is correct

// Get all books
router.get('/', (req, res) => {
    res.json(books);
});

// Get a book by ID
router.get('/:id', (req, res) => {
    const bookID = parseInt(req.params.id, 10);
    const book = books.find(b => b.id === bookID);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
});

// Add a new book
router.post('/', (req, res) => {
    try {
        const { title, author, year } = req.body;

        if (!title || !author || !year) {
            return res.status(400).json({ message: "Title, author, and year are required" });
        }

        const newBook = {
            id: books.length ? books[books.length - 1].id + 1 : 1,
            title,
            author,
            year
        };

        books.push(newBook); // ✅ Add the new book to the array

        res.status(201).json({
            message: "New Book is added",
            book: newBook
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//Update books
router.patch('/:id',(req,res)=>{
    try{
        const bookid=parseInt(req.params.id)
        const book=books.find(b => b.id === bookid);

        if(!book){
            return res.status(404).json({ message: "Book not found" });            
        } 
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "At least one field (title, author, or year) is required" });
        }

        const{title,author,year}=req.body
        if(title!=undefined) book.title=title
        if(author!=undefined) book.author=author
        if(year!=undefined) book.year=year
        res.status(200).json({
            message: "Book updated successfully",
            updatedBook: book
        });
    }catch(error)
    {
        console.error(error)
        res.status(500).json(error)
    }
})
// Delete Book

router.delete('/:id',(req,res)=>
{
    try{
        const bookid=parseInt(req.params.id)
        const bookindex=books.findIndex(b => b.id === bookid);

        if (bookindex === -1) {

            return res.status(404).json({ message: "Book not found" });            
        } 
        const deletedbook=books.splice(bookindex,1)
        res.status(200).json({message:"Deleted Successfully",book:deletedbook})
    }catch(error)
    {
        console.error(error)
        res.status(500).json(error)
    }
})

module.exports = router;
