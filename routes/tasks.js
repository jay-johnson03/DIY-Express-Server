import express from 'express';
import { tasks, getNextId } from '../data/storage.js';

const router = express.Router();

// GET all tasks
router.get('/', (req, res) => {
    // Optional filtering by completed status
    const { completed } = req.query;

    if (completed !== undefined) {
        const filtered = tasks.filter(t => t.completed === (completed === 'true'));
        return res.json(filtered);
    }
    res.json(tasks);
});

// GET single task
router.get('/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});

// POST new task
router.post('/', (req, res) => {
    const { title, categoryId } = req.body;
    const newTask = {
        id: getNextId(tasks), title, completed: false, categoryId: categoryId || 1
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT update task
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const { title, completed, categoryId } = req.body;

    tasks[index] = {
        ...tasks[index],
        title: title || tasks[index].title,
        completed: completed !== undefined ? completed : tasks[index].completed,
        categoryId: categoryId || tasks[index].categoryId
    };
    res.json(tasks[index]);
});

// DELETE task
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(index, 1);
    res.status(204).send();
});

export default router;