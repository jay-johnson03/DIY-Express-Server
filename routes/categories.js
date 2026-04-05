// mini express ap for category routes, using the imported categories
import express from 'express';
import { categories, getNextId } from '../data/storage.js';

const router = express.Router();

// GET all categories
router.get('/', (req, res) => {
    res.json(categories);
});

// GET single category
//route parameter 
router.get('/:id', (req, res) => {
    //string to number so it matches num.ID & finds the match
    const category = categories.find(c => c.id === parseInt(req.params.id));
    
    //can't find, 404 
    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json(category);
});

// POST create category
router.post('/', (req, res) => {
    const { name } = req.body;
    
    //validates if the field exists
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    //makes a new category
    const newCategory = {
        id: getNextId(categories),
        name
    };
    categories.push(newCategory);
    res.status(201).json(newCategory);
});

// PUT update category, 404 if not there
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const category = categories.find(c => c.id === id);
    
    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }
    // modify category.name updates the array
    const { name } = req.body;
    if (name) {
        category.name = name;
    }
    
    res.json(category);
});

// DELETE category
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // find the index to delete
    const index = categories.findIndex(c => c.id === id);
    
    // -1 isn't an index so not found
    if (index === -1) {
        return res.status(404).json({ error: 'Category not found' });
    }
    
    //removes 1 element from that positions
    categories.splice(index, 1);
    res.status(204).send();
});

export default router;
