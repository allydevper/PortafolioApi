import { Project } from '../models/project.interface';
import { pool } from '../db';
import dotenv from 'dotenv';

dotenv.config();

export const getProjects = async (): Promise<Project[]> => {
    const result = await pool.query('SELECT * FROM projects');
    return result.rows as Project[];
};

export const getProjectsByPage = async (page: number = 1, pageSize: number = 10): Promise<{ data: Project[]; count: number }> => {
    const offset = (page - 1) * pageSize;

    const dataResult = await pool.query<Project>(
        'SELECT * FROM projects ORDER BY create_date DESC LIMIT $1 OFFSET $2',
        [pageSize, offset]
    );

    const countResult = await pool.query<{ count: number }>('SELECT COUNT(*) FROM projects');
    const count = countResult.rows[0].count;

    return { data: dataResult.rows, count };
};

export const getLastestsProjects = async (): Promise<Project[]> => {
    const result = await pool.query<Project>(
        'SELECT * FROM projects ORDER BY create_date DESC LIMIT 4'
    );
    return result.rows;
};


export const createProject = async (project: Project): Promise<Project> => {
    const { name, url_project, description, technologies, url_demo, url_cover_image } = project;
    const result = await pool.query<Project>(
        `INSERT INTO projects (name, url_project, description, technologies, url_demo, url_cover_image)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
        [name, url_project, description, technologies, url_demo, url_cover_image]
    );
    return result.rows[0];
};

export const updateProject = async (id: string, project: Project) => {
    const { name, url_project, description, technologies, url_demo, url_cover_image } = project;

    const result = await pool.query<Project>(
        `UPDATE projects
       SET name = $1, url_project = $2, description = $3, technologies = $4, url_demo = $5, url_cover_image = $6
       WHERE id = $7
       RETURNING *`,
        [name, url_project, description, technologies, url_demo, url_cover_image, id]
    );

    return result.rows[0];
};

export const deleteProject = async (id: string) => {
    const result = await pool.query('DELETE FROM projects WHERE id = $1', [id]);
    return result.rowCount === 1;
};