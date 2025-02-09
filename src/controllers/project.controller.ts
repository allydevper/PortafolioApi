import { Project } from '../models/project.interface';

export const getProjects = async (): Promise<Project[]> => {
    return [
        {
            id: 1,
            name: 'Proyecto 1',
            url: 'http://proyecto1.com',
            description: 'Descripción del Proyecto 1',
            technologies: ['JavaScript', 'Node.js'],
            create_date: new Date('2023-01-01')
        },
        {
            id: 2,
            name: 'Proyecto 2',
            url: 'http://proyecto2.com',
            description: 'Descripción del Proyecto 2',
            technologies: ['TypeScript', 'Express'],
            create_date: new Date('2023-02-01')
        }
    ];
};

export const createProject = async (project: Project): Promise<Project> => {
    return project;
}; 