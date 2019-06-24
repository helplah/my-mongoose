const todo = require("./todo");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    const mongoURI = global.__MONGO_URI__;
    connection = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true
    });

    const uriArray = mongoURI.split("/");
    const dbName = uriArray[uriArray.length - 1];
    db = await connection.db(dbName);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await connection.close();
  });

  beforeEach(async () => {
    await db.dropDatabase();
  });

  it("insertOne should insert a doc into collection", async () => {
    const myToDoItem = {
      name: "grocery shopping",
      done: false
    };

    await todo.insertOne(myToDoItem);

    const todosCollection = db.collection("todos");
    const foundTodo = await todosCollection.findOne(myToDoItem);
    expect(foundTodo.name).toEqual("grocery shopping");
    expect(foundTodo.done).toEqual(false);
  });

  it("findByTodoName should find an item from the database", async () => {
    // insert into database using jest-mongo functions
    const Todos = db.collection("todos");
    const mockToDo = { name: "sweep floor", done: false };
    await Todos.insertOne(mockToDo);

    // fetching from the database with our own implementation
    const foundTodo = await todo.findByTodoName(mockToDo.name);
    expect(foundTodo).toMatchObject(mockToDo);
  });

  it("deleteToDoByName should remove the item from the database ", async () => {
    // inserting to database using jest-mongo functions
    const Todos = db.collection("todos");
    const mockToDo = { name: "sweep floor", done: false };
    await Todos.insertOne(mockToDo);

    // deleting todo based on name using our own function
    await todo.deleteToDoByName(mockToDo.name);

    const foundTodo = await Todos.findOne(mockToDo);
    expect(foundTodo).toBeFalsy();
  });

  it("completeToDoByName should set the todo to done", async () => {
    const Todos = db.collection("todos");
    const mockToDo = { name: "sweep floor", done: false };
    await Todos.insertOne(mockToDo);

    // should change the todo item done field from false to true
    await todo.completeTodoByName(mockToDo.name);

    // using jest-mongo check that the recored cannot be found
    const foundTodo = await Todos.findOne({ name: mockToDo.name });
    expect(foundTodo.done).toEqual(true);
  });
});
