const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let OrderSchema = new Schema({
  total: { type: Number, require: true },
  listProduct: { type: Array, require: true },
  orderID: { type: Schema.Types.ObjectId, require: true },
  time: { type: Schema.Types.Date, default: Date.now },
  week: { type: Schema.Types.Number, require: true },
});

module.exports = mongoose.model("Order", OrderSchema);
