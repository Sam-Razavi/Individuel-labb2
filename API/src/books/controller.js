const pool = require("../../db")
const quries = require("./queries")

const getbooks = (req,res) => {
    pool.query(quries.getbooks , (error,results) =>{
        if(error) throw error;
        res.status(200).json(results);
    })
}

const getbookbyid = (req , res) => {
    const id = parseInt(req.params.id)
    pool.query(quries.getbookbyid ,[id], (error , results) => {
        if(error) throw error;
        res.status(200).json(results);
    })
}

const addbooks = (req, res) => {
    const { author, title, genre, totalarticle, loaned, year } = req.body;
    pool.query(quries.addbooks, [author, title, genre, totalarticle, loaned, year], (error, results) => {
      if (error) {
        res.status(500).json({ error: "Error occurred while adding the book" });
      } else {
        res.status(201).json(results)
      }
    });
  };


const deletebook = (req,res) => {
    const id = parseInt(req.params.id);
    pool.query(quries.getbookbyid ,[id], (error , results) => {
        const nobook = !results.rows.length;
        if (nobook) {
            res.send("Books does't Exist")
        }
    })
    pool.query(quries.deletebook , [id] , (error , results) => {
        if(error) throw error;
        res.status(200).send("Book Deleted")
    })
}
const updatebook = (req, res) => {
    const id = parseInt(req.params.id);
    const { author, title, genre, totalarticle, loaned, year } = req.body;
    pool.query(quries.getbookbyid, [id], (error, results) => {
      const nobook = !results.rows.length;
      if (nobook) {
        res.status(404).json({ error: "Book does not exist" });
      } else {
        pool.query(
          quries.updatebook, [author, title, genre, totalarticle, loaned, year, id], (error, results) => {
            if (error) {
              res.status(500).json({ error: "Error occurred while updating the book" });
            } else {
              res.status(200).json({ message: "Book updated successfully" });
            }
          }
        );
      }
    });
  };





module.exports = {
    getbooks,
    getbookbyid,
    addbooks,
    deletebook,
    updatebook
}
