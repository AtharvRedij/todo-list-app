const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const { Todo } = require("../models/todo");

const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find().sort("name");
  res.send(todos);
});

router.post("/", async (req, res) => {
  const name = req.body.name.trim();
  if (!name) return res.status(400).send("name required");

  // create shorturl object
  const todo = new Todo({
    name,
  });

  await todo.save();
  res.send(todo);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const error = checkId(id);
  if (error) return res.status(400).send(error);

  const todo = await Todo.findById(id);
  if (!todo)
    return res.status(404).send("The todo with given ID doesn't exist");

  todo.complete = !todo.complete;
  await todo.save();
  res.send(todo);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const error = checkId(id);
  if (error) return res.status(400).send(error);

  const todo = await Todo.findByIdAndDelete(id);

  if (!todo)
    return res.status(404).send("The todo with given ID doesn't exist");

  res.send(todo);
});

const checkId = (id) => {
  if (!id) return "ID required";

  if (!ObjectId.isValid(id)) return "Invalid ID";

  return null;
};

module.exports = router;
