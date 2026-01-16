import express from "express";
import mysql from "mysql2";

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "blog_db"
})

connection.connect((err) => {
  if(err) {
    console.log(err);
  }
  else {
    console.log('Connected successfully');
  }
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  
})

