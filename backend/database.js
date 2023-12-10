var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static("images"));

const port = "4000";
const host = "localhost";

const { MongoClient, ObjectId } = require("mongodb");

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
  res.status(200).send(results);
});

app.get("/api/listProducts/:id", async (req, res) => {
  const productId = Number(req.params.id);
  console.log("Product to find :", productId);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = { id: productId };
  const result = await db.collection("fakestore_catalog").findOne(query);
  console.log("Result :", result);
  if (!result) res.status(404).send("Not Found");
  else res.status(200).send(result);
});

app.post("/api/createProduct", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to POST MongoDB");
  
  const newProduct = req.body;
  const result = await db.collection("fakestore_catalog").insertOne(newProduct);
  
  console.log("Inserted new product with ID:", result.insertedId);
  
  res.status(201).send({ _id: result.insertedId });
});

app.put("/api/updateProduct/:id", async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  console.log("Updating product with ID:", productId);

  await client.connect();
  const query = { _id: ObjectId(productId) };
  const result = await db.collection("fakestore_catalog").updateOne(query, { $set: updatedProduct });

  console.log("Modified product count:", result.modifiedCount);

  if (result.modifiedCount === 0) {
    res.status(404).send("Not Found");
  } else {
    res.status(200).send("Product updated successfully");
  }
});

app.delete("/api/deleteProduct/:id", async (req, res) => {
  const productId = Number(req.params.id);
  console.log("Deleting product with ID:", productId);

  await client.connect();
  const query = { id: productId };
  const result = await db.collection("fakestore_catalog").deleteOne(query);

  console.log("Deleted product count:", result.deletedCount);

  if (result.deletedCount === 0) {
    res.status(404).send("Not Found");
  } else {
    res.status(200).send("Product deleted successfully");
  }
});
