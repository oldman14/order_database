const express = require("express");
const routerTable = express.Router();
const Table = require("../models/Table");
const { request } = require("express");

routerTable.get("/", async (req, res) => {
  try {
    const table = await Table.find();
    res.json(table);
  } catch (error) {
    res.json({ message: error });
  }
});
//ADD PRODUCT
routerTable.post("/", async (req, res) => {
  console.log(req.body);
  const tableStore = new Table({
    tableName: req.body.params.tableName,
  });
  try {
    const addTable = await tableStore.save();
    res.json(addTable);
  } catch (error) {
    res.json(error);
  }
});

//UPDATE PRODUCT WITH ID
routerTable.patch("/", async (req, res) => {
  console.log(req.body);
  try {
    await Table.updateOne(
      { _id: req.body.params._id },
      { $set: { tableName: req.body.params.tableName } }
    );
    const table = await Table.find();
    res.json(table);
  } catch (error) {
    res.json({ message: error });
  }
});
//Delete Product
routerTable.delete("/", async (req, res) => {
  console.log(req.body);
  try {
    await Table.remove({ _id: req.body.params._id });
    const table = await Table.find();
    res.json(table);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = routerTable;
