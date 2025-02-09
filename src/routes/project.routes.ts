import { Router } from 'express';
import { getProjects, createProject } from '../controllers/project.controller';

const router = Router();

router.get('/', async (req, res) => {
    const projects = await getProjects();
    res.json(projects);
});

router.post('/', async (req, res) => {
    const newProject = await createProject(req.body);
    res.status(201).json(newProject);
});

export default router; 