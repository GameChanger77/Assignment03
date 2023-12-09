const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "gamer",
  password: "gamer",
  database: "secoms319",
});

module.exports = db;
