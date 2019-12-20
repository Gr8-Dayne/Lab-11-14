'use strict';


// global const
const express = require('express');
const superagent = require('superagent');
const app = express();


// const books = [];


// app.'s
app.set('view engine', 'ejs');
app.use(express.static('styles'));
app.use(express.urlencoded({extended: true}));


// function to handle errors
function errors(error, response) {
  // console.error(error);
  response.render('error');
}


console.log(errors);


// When page is inittially displayed:
app.get('/', (req, res) => {
  superagent.get(`https://www.googleapis.com/books/v1/volumes/?q=${'star wars'}`)
    .then(book => {
      res.render('index', { books: book.body.items });
    });

});


// If search bar button is hit:
app.post('/show', (req, res) => {
  superagent.get(`https://www.googleapis.com/books/v1/volumes/?q=${'star trek'}`)
    .then(book => {

      console.log(book.body.items);

      // console.log(book);

      // constructor function
      // function BookObject(title, author, description, img) {
      //   this.img = 
      //   this.title = book.volumeInfo.title
      //   this.catagories = book.volumeInfo.categories
      //   this.authors = book.volumeInfo.authors
      //   this.description = book.volumeInfo.description
      //   this.isbn = book.volumeInfo.isbn
      //   console.log(this)
      // }


      res.render('show', { books: book.body.items });
    });

});


const PORT = process.env.PORT || 3099
app.listen(PORT, () => console.log(`Port ${PORT} for the win!`));

