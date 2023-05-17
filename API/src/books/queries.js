const getbooks = "SELECT * FROM books";
const getbookbyid = "SELECT * FROM books WHERE id = $1";
const addbooks = "INSERT INTO books (author,title,genre,totalarticle,loaned,year) VALUES ($1, $2, $3, $4, $5, $6)";
const deletebook = "DELETE FROM books WHERE id=$1";
const updatebook = "UPDATE books SET author = $1, title = $2, genre = $3, totalarticle = $4, loaned = $5, year = $6 WHERE id = $7";



module.exports = {
    getbooks,
    getbookbyid,
    addbooks,
    deletebook,
    updatebook
}
