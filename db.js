const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres", // Use the new user's username here
  password: "dihan", // Use the new user's password here
  port: 5432,
  database: "bookDB",
});
module.exports = pool;
