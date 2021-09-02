const express = require("express");
const routerOrder = express.Router();
const Order = require("../models/Order");
const { request } = require("express");

routerOrder.get("/", async (req, res) => {
  try {
    const order = await Order.find();
    res.json(order);
  } catch (error) {
    res.json({ message: error });
  }
});
//ADD PRODUCT
routerOrder.post("/", async (req, res) => {
  const order = new Order({
    total: req.body.params.total,
    listProduct: req.body.params.listProduct,
    week: req.body.params.week,
  });
  try {
    const addOrder = await order.save();
    console.log("log add order", addOrder);
    res.json(addOrder);
  } catch (error) {
    res.json(error);
  }
});

//UPDATE PRODUCT WITH ID
// routerOrder.patch("/", async (req, res) => {
//   console.log(req.body);
//   try {
//     await Table.updateOne(
//       { _id: req.body.params._id },
//       { $set: { tableName: req.body.params.tableName } }
//     );
//     const table = await Table.find();
//     res.json(table);
//   } catch (error) {
//     res.json({ message: error });
//   }
// });
// //Delete Product
// routerOrder.delete("/", async (req, res) => {
//   console.log(req.body);
//   try {
//     await Table.remove({ _id: req.body.params._id });
//     const table = await Table.find();
//     res.json(table);
//   } catch (error) {
//     res.json({ message: error });
//   }
// });

module.exports = routerOrder;
