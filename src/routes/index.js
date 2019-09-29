const { Router } = require("express");
const fs = require("fs");
const uuid = require("uuid").v4;

const router = Router();
const json_books = fs.readFileSync("src/book.json", "utf-8");
let books = JSON.parse(json_books);

router.route("/").get((req, res) => {
  res.render("index", {
    books
  });
});

router
  .route("/newBook")
  .get((req, res) => {
    res.render("newBook");
  })
  .post((req, res) => {
    const { title, author, description, image } = req.body;
    if (!title || !author || !description || !image) {
      res.status(401).send("Todos los campos son necesarios");
      return;
    }
    const id = uuid();
    const newBook = {
      id,
      title,
      author,
      image,
      description
    };
    books.push(newBook);
    const convert_book = JSON.stringify(books);
    fs.writeFileSync("src/book.json", convert_book, "utf-8");
    res.redirect("/");
  });

router.route("/delete/:id").get((req, res) => {
  books = books.filter(book => book.id != req.params.id);
  const convert_book = JSON.stringify(books);
  fs.writeFileSync("src/book.json", convert_book, "utf-8");
  res.redirect("/");
  //res.send('Deleted')
});

module.exports = router;
