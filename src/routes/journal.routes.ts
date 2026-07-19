import { Router } from 'express';
import {
    getJournalEntries,
    createJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
} from '../controllers/journal.controller';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const { month, project_id } = req.query;
        const entries = await getJournalEntries({
            month: typeof month === 'string' ? month : undefined,
            project_id: project_id !== undefined ? Number(project_id) : undefined,
        });
        res.json(entries);
    } catch (error: Error | any) {
        res.status(500).json({ error: 'Error fetching journal entries', details: error?.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const entry = await createJournalEntry(req.body);
        res.status(201).json(entry);
    } catch (error: Error | any) {
        res.status(500).json({ error: 'Error creating journal entry', details: error?.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updated = await updateJournalEntry(req.params.id, req.body);
        res.json(updated);
    } catch (error: Error | any) {
        res.status(500).json({ error: 'Error updating journal entry', details: error?.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await deleteJournalEntry(req.params.id);
        res.status(204).send();
    } catch (error: Error | any) {
        res.status(500).json({ error: 'Error deleting journal entry', details: error?.message });
    }
});

export default router;
