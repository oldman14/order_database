const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
  productName: { type: String, require: true, max: 100 },
  price: { type: Number, require: true },
  image: { type: String, require: true },
  ProductID: { type: Schema.Types.ObjectId, require: true },
});

module.exports = mongoose.model("Product", ProductSchema);
