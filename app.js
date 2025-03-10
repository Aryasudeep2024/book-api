const express = require('express');
const path = require('path'); 
const booksRoutes = require('./route/booksRoutes'); 

const app = express();


app.use('/books', booksRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
