const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const { Client } = require("pg");

const client = new Client(process.env.CONNECTION_STRING);

client.connect();

//GET --- test to see if server is live
app.get("/", (req, res) => {
  res.json("Hello World!");
});

//GET --- retrieve all books in the database
app.get("/api/books", (req, res) => {
  async function getbooks() {
    try {
      const result = await client.query("SELECT * FROM books");
      res.status(202).send(result.rows);
    } catch (err) {
      next(err);
    }
  }
  getbooks();
});

//GET --- retrieve book by ID from the database
app.get("/api/books/:id", (req, res, next) => {
  async function getbookByID() {
    try {
      const result = await client.query(
        `SELECT * FROM books
            WHERE id = $1`,
        [req.params.id]
      );
      if (result.rows.length === 0) {
        res.status(404).send("book ID not found or improperly formatted!");
      } else {
        res.status(202).send(result.rows);
      }
    } catch (err) {
      next(err);
    }
  }
  getbookByID();
});

//GET --- retrieve books by Author from the database
app.get("/api/author/:name", (req, res, next) => {
  async function getBooksByAuthor() {
    try {
      let lowerCaseAuthor = req.params.name.toLowerCase();
      const result = await client.query(
        `
            SELECT * FROM books 
            WHERE lower(author) LIKE` +
          " '%" +
          lowerCaseAuthor +
          "%'"
      );
      if (result.rows.length === 0) {
        res.status(404).send("No books found!");
      } else {
        res.status(202).send(result.rows);
      }
    } catch (err) {
      next(err);
    }
  }
  getBooksByAuthor();
});

//POST --- add a new book entry into the database
app.post("/api/books/", (req, res, next) => {
  let book = req.body;
  console.log(book);
  if (book.title && book.author && book.cover && book.isbn && book.price) {
    async function postbook(book) {
      try {
        const result = await client.query(
          `
                INSERT INTO books (title, author, cover, isbn, price) 
                VALUES ($1, $2, $3, $4, $5) 
                RETURNING *
                `,
          [book.title, book.author, book.cover, book.isbn, book.price]
        );
        res.status(201).send(result.rows);
      } catch (err) {
        next(err);
      }
    }
    postbook(book);
  } else {
    res.status(500).send("Format = title, author, cover, isbn, price!");
  }
});

//PATCH --- update data for an existing book entry in the database
app.patch("/api/books/:id", (req, res, next) => {
  let book = req.body;
  console.log(book);
  async function patchbook() {
    try {
      const idCheck = await client.query(
        `
            SELECT * FROM books
            WHERE id = $1
            `,
        [req.params.id]
      );
      if (idCheck.rows.length === 0) {
        res.status(404).send("book ID not found or improperly formatted!");
      }
      if (book.title) {
        const resultTitle = await client.query(
          `
                UPDATE books 
                SET title = $1
                WHERE id = $2 RETURNING *
                `,
          [book.title, req.params.id]
        );
      }
      if (book.cover) {
        const resultCover = await client.query(
          `
                UPDATE books 
                SET cover = $1
                WHERE id = $2 RETURNING *
                `,
          [book.cover, req.params.id]
        );
      }
      if (book.author) {
        const resultAuthor = await client.query(
          `
                UPDATE books 
                SET author = $1
                WHERE id = $2 RETURNING *
                `,
          [book.author, req.params.id]
        );
      }
      if (book.isbn) {
        const resultISBN = await client.query(
          `
                UPDATE books 
                SET isbn = $1
                WHERE id = $2 RETURNING *
                `,
          [book.isbn, req.params.id]
        );
      }
      if (book.price) {
        const resultPrice = await client.query(
          `
                UPDATE books 
                SET price = $1
                WHERE id = $2 RETURNING *
                `,
          [book.price, req.params.id]
        );
      }
      const result = await client.query(
        `
            SELECT * FROM books
            WHERE id = $1
            `,
        [req.params.id]
      );
      res.status(200).send(result.rows);
    } catch (err) {
      next(err);
    }
  }
  patchbook();
});

//DELETE --- remove an existing book entry by ID from the database
app.delete("/api/books/:id", (req, res, next) => {
  async function deleteBook() {
    try {
      const result = await client.query(
        `
            DELETE FROM books
            WHERE id = $1 RETURNING *
            `,
        [req.params.id]
      );
      if (result.rows.length === 0) {
        res.status(404).send("book ID not found or improperly formatted!");
      } else {
        res.status(200).send(result.rows[0]);
      }
    } catch (err) {
      next(err);
    }
  }
  deleteBook();
});

//Error handling route
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal server error!");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log();
  console.log(`  App running in port ${port}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${port}/\x1b[0m`);
});
