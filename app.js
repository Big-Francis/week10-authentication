require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors('*'));

let todos = [
    // in-memory data: array of object 
    {id: 1, task: 'finish week 4 slides', completed: false},
    {id: 2, task: 'deploy API today', completed: false}
];

// get all the data in the fake database
app.get('/todos', (req,res) => res.status(200).json(todos)
);

// post new data
app.post('/todos',(req, res) => {
    const {task} = req.body;
    if (!task) return res.status(400).json({error: ' Task field require'});
    const newTodo = { id: todos.length +1, task, completed: false};
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// get one data from the database

app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((t) => t.id === id);
    if (!todo) return res.status(404).json({error: 'Not Found'});
    res.status(200).json(todo)
});

// Patch or updating a data in the database
app.patch('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((t) => t.id === id);
    if (!todo) return res.status(404).json({error: 'not found'});
    Object.assign(todo, req.body);
    res.status(200).json(todo);
});

// Deleting data from the database
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const lenbefore = todos.length;
    todos = todos.filter((t) => t.id === id);
    if (todos.length === lenbefore) 
        return res.status(404).json({error: 'Not found'});
    res.status(204).send();
});

// declaring the port
const PORT = process.env.PORT;
app.listen(PORT, () => 
    console.log(`API is live on port ${PORT}`)
); 