import mysql from 'mysql2';

export const getConnection = () => mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "blog_db"
});
