import express from "express";
import mysql from "mysql2";

const app = express();
const port = 3006;
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
// INDEX
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
// SHOW
app.get('/posts/:id', (req, res) => {
  const id = req.params.id
  const sql = 'SELECT * FROM posts WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'query failed' })
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'post not funny' })
    }
    res.json(results[0])
  })

})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);

})

