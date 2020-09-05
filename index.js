const express = require("express");
const mongoose = require("mongoose");
const todos = require("./routes/todos");

mongoose
  .connect("mongodb://localhost:27017/todos-db", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.use("/api/todos", todos);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
