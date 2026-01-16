import express from "express";
import mysql from "mysql2";
import router from "./routers/posts.js";
import { getConnection } from "./db/connection.js";

const app = express();
const port = 3006;
app.use(express.json());

const connection = getConnection();

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

app.use('/posts', router)

// INDEX
// app.get('/posts', (req, res) => {
//   const query = 'SELECT * FROM posts';
//   connection.query(query, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       res.json({
//         results: result,
//       })
//     }
//   })
// })
// SHOW
// app.get('/posts/:id', (req, res) => {
//   const id = req.params.id
//   const sql = 'SELECT * FROM posts WHERE id = ?';
//   connection.query(sql, [id], (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: 'query failed' })
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ error: 'post not found' })
//     }
//     res.json(results[0])
//   })
// })
// DESTROY
// app.delete('/posts/:id', (req, res) => {
//   const id = req.params.id
//   const sql = "DELETE FROM posts WHERE id = ?";
//   connection.query(sql, [id], (err, results) => {
//     if (err) {
//       return res.status(500).json(err)
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ error: 'post not found' })
//     }
//     res.status(204).send('post deleted')
//   })
// })

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);

})

