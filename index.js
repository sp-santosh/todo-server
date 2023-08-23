const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES
//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
    console.log(req.body);
  } catch (err) {
    console.log(err);
  }
});

//get all todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
    console.log(req.params);
  } catch (err) {
    console.log(err);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.log(err);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err);
  }
});

const port = 8080; // Set the desired port number

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.listen(8080, () => {
//   console.log("Server is running on port 8080");
// });
