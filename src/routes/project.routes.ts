import { Router } from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/project.controller';

const router = Router();

router.get('/', async (req, res) => {
    const projects = await getProjects();
    res.json(projects);
});

router.post('/', async (req, res) => {
    const newProject = await createProject(req.body);
    res.status(201).json(newProject);
});

router.put('/:id', async (req, res) => {
    const updatedProject = await updateProject(req.params.id, req.body);
    res.json(updatedProject);
});

router.delete('/:id', async (req, res) => {
    await deleteProject(req.params.id);
    res.status(204).send();
});

export default router; 