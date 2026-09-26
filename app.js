const express = require('express');

const app = express();
app.use(express.json());

let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: false }
];

let nextId = 3;

// GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// GET one todo
app.get('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.json(todo);
});

// GET active (incomplete) todos
app.get('/todos/active', (req, res) => {
  res.json(todos.filter(todo => !todo.completed));
});

// POST a todo
app.post('/todos', (req, res) => {
  const { task, completed = false } = req.body;

  if (!task) {
    return res.status(400).json({ message: 'Task is required' });
  }

  const todo = {
    id: nextId++,
    task,
    completed
  };

  todos.push(todo);
  res.status(201).json(todo);
});

// PUT/update a todo
app.put('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const { task, completed } = req.body;

  if (task !== undefined) todo.task = task;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const deletedTodo = todos.splice(index, 1)[0];
  res.json(deletedTodo);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
