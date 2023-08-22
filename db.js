const { Pool } = require("pg");

const dbPool = new Pool({
  user: "postgres",
  password: "QsYpJCEzATVLCgFYr0hV",
  host: "containers-us-west-33.railway.app",
  port: 6290,
  database: "railway",

  //RailWay//

  // user: "admin",
  // password: "admin",
  // host: "localhost",
  // port: 5432,
  // database: "todo",
});

module.exports = dbPool;
