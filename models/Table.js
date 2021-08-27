const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TableStoreSchema = new Schema({
  tableName: { type: String, require: true, max: 100 },
  TableID: { type: Schema.Types.ObjectId, require: true },
});

module.exports = mongoose.model("TableStore", TableStoreSchema);
