import { Todo } from '../models/todo.interface';
import { pool } from '../db';
import dotenv from 'dotenv';

dotenv.config();

export interface TodoFilters {
    project_id?: number;
    done?: boolean;
    standalone?: boolean;
}

export const getTodos = async (filters: TodoFilters = {}): Promise<Todo[]> => {
    const conditions: string[] = [];
    const values: (number | boolean)[] = [];
    let i = 1;

    if (filters.standalone) {
        conditions.push('project_id IS NULL');
    } else if (filters.project_id !== undefined) {
        conditions.push(`project_id = $${i++}`);
        values.push(filters.project_id);
    }

    if (filters.done !== undefined) {
        conditions.push(`done = $${i++}`);
        values.push(filters.done);
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const result = await pool.query<Todo>(
        `SELECT * FROM todos ${where} ORDER BY done ASC, create_date DESC`,
        values
    );
    return result.rows;
};

export const createTodo = async (todo: Todo): Promise<Todo> => {
    const { title, description, done, project_id } = todo;
    const result = await pool.query<Todo>(
        `INSERT INTO todos (title, description, done, project_id)
         VALUES ($1, $2, COALESCE($3, false), $4)
         RETURNING *`,
        [title, description ?? null, done ?? false, project_id ?? null]
    );
    return result.rows[0];
};

export const updateTodo = async (id: string, todo: Todo): Promise<Todo> => {
    const { title, description, done, project_id } = todo;
    const result = await pool.query<Todo>(
        `UPDATE todos
         SET title = $1,
             description = $2,
             done = COALESCE($3, done),
             project_id = $4,
             update_date = NOW()
         WHERE id = $5
         RETURNING *`,
        [title, description ?? null, done, project_id ?? null, id]
    );
    return result.rows[0];
};

export const deleteTodo = async (id: string): Promise<boolean> => {
    const result = await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    return result.rowCount === 1;
};
