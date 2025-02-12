import { Router } from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/project.controller';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const projects = await getProjects();
        res.json(projects);
    } catch (error: Error | any) {
        res.status(500).json({ error: 'Error fetching projects', details: error?.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newProject = await createProject(req.body);
        res.status(201).json(newProject);
    } catch (error: Error | any) {
        res.status(500).json({ error: 'Error creating project', details: error?.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedProject = await updateProject(req.params.id, req.body);
        res.json(updatedProject);
    } catch (error: Error | any) {
        res.status(500).json({ error: 'Error updating project', details: error?.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await deleteProject(req.params.id);
        res.status(204).send();
    } catch (error: Error | any) {
        res.status(500).json({ error: 'Error deleting project', details: error?.message });
    }
});

export default router;
