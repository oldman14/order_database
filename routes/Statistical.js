const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { request } = require("express");

const getDateClient = (date) => {
  const resDate = date.replace("-", "/").split("T")[0].replace("-", "/");
  return resDate;
};
const getDateDB = (date) => {
  const resDate = date
    .toISOString()
    .replace("-", "/")
    .split("T")[0]
    .replace("-", "/");
  return resDate;
};
const getWeek = (currentdate) => {
  // var currentdate = new Date();
  var oneJan = new Date(currentdate.getFullYear(), 0, 1);
  var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  var result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
  return result;
};
router.get("/", async (req, res) => {
  try {
    const order = await Order.find();
    const date = getDateClient(req.query.onDate);
    const listOrder = order.filter((value, index) => {
      const dateValue = getDateDB(value.time);
      if (dateValue == date) {
        return value;
      }
    });
    const total = listOrder.reduce((pre, cur) => {
      return pre + cur.total;
    }, 0);
    res.json(total);
  } catch (error) {
    res.json({ message: error });
  }
});
router.get("/day", async (req, res) => {
  console.log(req);
  try {
    const order = await Order.find({
      time: {
        $gt: new Date(req.query.today),
        $lt: new Date(req.query.nextDay),
      },
    });
    let dataOrder = [];
    order.forEach((element) => {
      element.listProduct.forEach((e) => {
        if (dataOrder.length > 0) {
          const index = dataOrder.findIndex(
            (item) => item.product._id == e.product._id
          );
          if (index >= 0) {
            dataOrder[index].quantity = dataOrder[index].quantity + e.quantity;
          } else {
            dataOrder.push(e);
          }
        } else {
          dataOrder.push(e);
        }
      });
    });

    res.json(dataOrder);
  } catch (error) {
    console.log({ message: error });
  }
});
router.get("/week", async (req, res) => {
  try {
    const order = await Order.find();
    order.forEach((element) => {
      const week = getWeek(element.time);
      console.log("week" + week + "day" + element.time);
    });
    const date = getDateClient(req.query.onDate);
    const weekClient = req.query.week;
    const yearClient = req.query.year;
    console.log("Log dayt clien", weekClient);
    console.log("Log week client", yearClient);
    const listOrder = order.filter((value, index) => {
      const weekDB = getWeek(value.time);
      const yearDB = value.time.getFullYear();

      if (yearClient == yearDB && weekDB == weekClient) {
        return value;
      }
    });
    const total = listOrder.reduce((pre, cur) => {
      return pre + cur.total;
    }, 0);
    res.json(total);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
