import express from "express";
import mysql from "mysql2";

const app = express();
const port = 3000;
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "blog_db"
})

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Connected successfully');
  }
})

app.get('/', (req, res) => {
  res.send('sever works')
})

app.get('/posts', (req, res) => {
  const query = 'SELECT * FROM posts';

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.json({
        results: result,
      })
    }
  })
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);

})

