const { Pool } = require("pg");

const dbPool = new Pool({
  user: "admin",
  password: "admin",
  host: "localhost",
  port: 5432,
  database: "todo",
});

module.exports = dbPool;
