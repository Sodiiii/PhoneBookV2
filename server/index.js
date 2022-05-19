const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "phoneBook",
});

app.post("/create", (req, res) => {
  const phone = req.body.phone;

  db.query("INSERT INTO phones (phone) VALUE (?)", [phone], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values inserted");
    }
  });
});

app.get("/phones", (req, res) => {
  db.query("SELECT * FROM phones", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Connected to server");
});
