const mongoose = require("mongoose");
require("./db");
require("./todo.model");

const TodoModel = mongoose.model("Todo");

module.exports.insertOne = async todo => {
  // insert my item in the model
  const todoDocument = new TodoModel(todo);
  return await todoDocument.save();
};

module.exports.findByTodoName = async name => {
  const foundItem = await TodoModel.findOne({ name });
  return foundItem;
};

module.exports.deleteToDoByName = async name => {
  await TodoModel.deleteOne({ name });
};

module.exports.completeTodoByName = async name => {
  await TodoModel.findOneAndUpdate({ name }, { done: true });
};
