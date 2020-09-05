const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  complete: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  Todo,
};
