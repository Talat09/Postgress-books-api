const express = require("express");
const { v4: uuidv4 } = require("uuid");
const pool = require("./db");
const app = express();
const PORT = 3001;
app.use(express.json()); // for json data
app.use(express.urlencoded({ extended: true })); //for from data
app.listen(PORT, () => {
  console.log(`server is running on Port:${PORT}`);
});
//  Get /books --> return all the books
app.get("/books", async (req, res) => {
  try {
    const books = await pool.query("SELECT *FROM book");
    res.status(200).json({ message: "books are returned", data: books.rows });
  } catch (error) {
    res.json({ error: error.message });
  }
});
//  Get /books/:id --> return a specific books
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json({ message: "Specific book is returned with id:", id });
  } catch (error) {
    res.json({ error: error.message });
  }
});
//  Post /books --> create a  book
// name , description, id needed
app.post("/books", async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const id = uuidv4();

    //inserting book data into database
    const newBook = await pool.query(
      "INSERT INTO book(id,name,description,image) VALUES ($1,$2,$3,$4) RETURNING *",
      [id, name, description, image]
    );
    res.status(201).json({
      message: `Book is created`,
      data: newBook.rows,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});
//  Delete /books/:id --> delete a book
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json({ message: "Specific book is deleted with id:", id });
  } catch (error) {
    res.json({ error: error.message });
  }
});
//  PUT /books/:id --> Update a book
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    res.status(200).json({ message: `Update a book: ${name},${description}` });
  } catch (error) {
    res.json({ error: error.message });
  }
});
//CRUD -> create ,Read , update , Delete using postgresSql
