const express = require("express");
require("dotenv").config();
const app = express();

require("./config.js");
// const User = require("./employees.js")
const Product = require("./products.js");

const cors = require("cors");
app.use(cors());

const bodyparser = require("body-parser");
app.use(bodyparser.json());

// for creating new product form api post api
app.post("/add-product", async (req, res) => {
  const data = new Product(req.body);
  const docs = await data.save();
  console.log(docs);
  res.send(docs);
});

app.get("/read", async (req, res) => {
  const data = await Product.find();
  res.send(data);
  console.log(data);
});

app.delete("/delete/:id", async (req, res) => {
  const data = await Product.deleteOne({ _id: req.params.id });
  console.log(data);
  res.send(data);
});

app.get("/onedata/:id", async (req, res) => {
  const data = await Product.findOne({ _id: req.params.id });

  if (data) {
    res.send(data);
    console.log(data);
  } else {
    res.send({ data: "no record found" });
  }
});

app.put("/update/:id", async (req, res) => {
  const data = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(data);
  console.log(data);
});

app.get("/search/:key", async (req, res) => {
  const data = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  res.send(data);
  console.log(data);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`your port is running on ${PORT}`);
});
//adshamim320
//56f$UjFBGv64my8
