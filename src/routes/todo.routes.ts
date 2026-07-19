import { Router } from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todo.controller';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const { project_id, done, standalone } = req.query;
        const todos = await getTodos({
            project_id: project_id !== undefined ? Number(project_id) : undefined,
            done: done !== undefined ? done === 'true' || done === '1' : undefined,
            standalone: standalone === '1' || standalone === 'true',
        });
        res.json(todos);
    } catch (error: Error | any) {
        res.status(500).json({ error: 'Error fetching todos', details: error?.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newTodo = await createTodo(req.body);
        res.status(201).json(newTodo);
    } catch (error: Error | any) {
        res.status(500).json({ error: 'Error creating todo', details: error?.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updated = await updateTodo(req.params.id, req.body);
        res.json(updated);
    } catch (error: Error | any) {
        res.status(500).json({ error: 'Error updating todo', details: error?.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await deleteTodo(req.params.id);
        res.status(204).send();
    } catch (error: Error | any) {
        res.status(500).json({ error: 'Error deleting todo', details: error?.message });
    }
});

export default router;
