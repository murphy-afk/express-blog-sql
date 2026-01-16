import { getConnection } from "../db/connection.js";
const connection = getConnection();

function index(req, res) {
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
}

function show(req, res) {
    const id = req.params.id
    const sql = 'SELECT * FROM posts WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'query failed' })
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'post not found' })
      }
      res.json(results[0])
    });
  }


function destroy(req, res) {
  const id = req.params.id
  const sql = "DELETE FROM posts WHERE id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json(err)
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'post not found' })
    }
    res.status(204).send('post deleted')
  })
}

const postsController = {
  index,
  show,
  destroy
};

export default postsController