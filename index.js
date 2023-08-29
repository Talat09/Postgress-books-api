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
app.get("/", async (req, res) => {
  res.send("Book store is Running");
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
    const book = await pool.query("SELECT *FROM book WHERE id=$1", [id]);
    res
      .status(200)
      .json({ message: "Specific book is returned", data: book.rows });
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
    const deletedBook = await pool.query("DELETE FROM book WHERE id=$1", [id]);
    res
      .status(200)
      .json({ message: "Book was deleted", data: deletedBook.rows });
  } catch (error) {
    res.json({ error: error.message });
  }
});

//  PUT /books/:id --> Update a book
// app.put("/books/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const { name, description, image } = req.body;
//     const updatedBook = await pool.query(
//       "UPDATE book SET name=$1, description=$2, image=$3 WHERE id=$4 RETURNING *",
//       [name, description, image, id]
//     );
//     res.status(200).json({ message: `Update a book`, data: updatedBook.rows });
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });

//chat gpt put books
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;

    // Initialize an array to hold the SET clause parts
    const setClauseParts = [];
    const values = [];

    // Construct the SET clause parts based on provided fields
    if (name !== undefined) {
      setClauseParts.push(`name=$${values.length + 1}`);
      values.push(name);
    }
    if (description !== undefined) {
      setClauseParts.push(`description=$${values.length + 1}`);
      values.push(description);
    }
    if (image !== undefined) {
      setClauseParts.push(`image=$${values.length + 1}`);
      values.push(image);
    }

    // Return early if no fields are provided for update
    if (setClauseParts.length === 0) {
      return res.status(400).json({ error: "No fields provided for update." });
    }

    // Construct the complete update query
    const setClause = setClauseParts.join(", ");
    values.push(id);
    const updateQuery = `UPDATE book SET ${setClause} WHERE id=$${values.length} RETURNING *`;

    // Perform the update operation on the database using the pool query
    const updatedBook = await pool.query(updateQuery, values);

    res
      .status(200)
      .json({ message: `Book updated successfully`, data: updatedBook.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//CRUD -> create ,Read , update , Delete using postgresSql
