var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static("images"));

const port = "4000";
const host = "localhost";

const { MongoClient } = require("mongodb");

// Mongo
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

app.get("/api/listProducts", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db
    .collection("fakestore_catalog")
    .find(query)
    .limit(100)
    .toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

app.get("/api/listProducts/:id", async (req, res) => {
  const productid = Number(req.params.id);
  console.log("Product to find :", productid);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = { id: productid };
  const results = await db.collection("fakestore_catalog").findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
});

app.post("/api/createProduct", async (req, res) => {
  
});

