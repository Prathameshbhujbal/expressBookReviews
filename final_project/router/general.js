const express = require('express');
let books = require("./booksdb.js");
let { users, isValid } = require("./auth_users.js");
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
    if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  else if (!username) res.status(404).json({message: "Please provide username."});
  else if (!password) res.status(404).json({message: "Unable to register password."});
  else return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  //Write your code here

  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  //Write your code here
  const isbn = req.params.isbn
  return res.status(200).json(await books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  //Write your code here
  let book = books['1']
  for (const index in books){
      if (books[index].author === req.params.author) book = index
   }
  return res.status(200).json(await books[book]);
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //Write your code here
  let book = books['1']
  for (const index in books){
      if (books[index].title === req.params.title) book = index
   }
  return res.status(200).json(await books[book]);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn
  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
