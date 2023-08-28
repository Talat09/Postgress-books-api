const express = require("express");
const app = express();
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server is running on Port:${PORT}`);
});
//  Get /books --> return all the books
app.get("/books", async (req, res) => {
  try {
    res.status(200).json({ message: "books are returned" });
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
//  Delete /books/:id --> delete a book
//  PUT /books/:id --> Update a book
