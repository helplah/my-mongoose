const mongoose = require("mongoose");
// require('./db) because I only needed mongoose.model("Todo", toDoSchema)
require("./db");

// model
const TodoModel = mongoose.model("Todo");
// create a document that haven't been saved until myTodo.save()
const myTodo = new TodoModel({ name: "" + Math.random(), done: true });

// myTodo.save().then(async () => {})
TodoModel.find().then(async () => {
  const allToDos = await TodoModel.find();

  const foundOneTodo = await TodoModel.findOne({
    _id: "5d0c8e8c9db3a9051069f800"
  }).catch(e => console.log(e));

  const foundIdByTodo = await TodoModel.findById(
    "5d0c8e8c9db3a9051069f800"
  ).catch(e => console.log(e));

  console.log("allToDos:", allToDos);
  console.log("foundOneTodo:", foundOneTodo);
  console.log("foundIdByTodo:", foundIdByTodo);
});

TodoModel.findById("5d0c8e8c9db3a9051069f800", async (err, todo) => {
  if (err) {
    // do something
  }
  todo.done = true;
  await todo.save();

  const oldTodo = await TodoModel.findByIdAndUpdate(
    "5d0c8e8c9db3a9051069f800",
    { done: false }
  );

  const newToDo = await TodoModel.findById("5d0c8e8c9db3a9051069f800");

  console.log("oldTodo update to false", oldTodo);
  console.log("newToDo after update to false", newToDo);

  await TodoModel.deleteOne({ _id: "5d0c8e8c9db3a9051069f800" });
  const deletedItem = await TodoModel.findById("5d0c8e8c9db3a9051069f800");
  console.log("deletedItem", deletedItem);
});
