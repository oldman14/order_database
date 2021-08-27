//import modules
const express = require("express");
const app = express();
const mongooso = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv/config");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("We are get post");
});

//Import Product Router
const productRouter = require("./routes/Product");
app.use("/product", productRouter);

//Import Table Router
const tableRouter = require("./routes/Table");
app.use("/table", tableRouter);
//connect to DB
mongooso.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log("Cannot connect to mongodb", err);
    } else {
      console.log("Connect to mongodb successful");
    }
  }
);

app.listen(3000);
//open server at port 3000
// app.listen(process.env.PORT || 3000, ()=>{
//     console.log("Server is listening on port 3000");
// })
