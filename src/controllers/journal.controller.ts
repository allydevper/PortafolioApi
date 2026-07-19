import { JournalEntry } from '../models/journal.interface';
import { pool } from '../db';
import dotenv from 'dotenv';

dotenv.config();

export interface JournalFilters {
    month?: string; // YYYY-MM
    project_id?: number;
}

function normalizeMonth(month: string): string {
    // Accept YYYY-MM or YYYY-MM-DD → store as first day of month
    const match = month.match(/^(\d{4})-(\d{2})/);
    if (!match) {
        throw new Error('Invalid month format. Use YYYY-MM');
    }
    return `${match[1]}-${match[2]}-01`;
}

export const getJournalEntries = async (filters: JournalFilters = {}): Promise<JournalEntry[]> => {
    const conditions: string[] = [];
    const values: (string | number)[] = [];
    let i = 1;

    if (filters.month) {
        conditions.push(`entry_month = $${i++}`);
        values.push(normalizeMonth(filters.month));
    }

    if (filters.project_id !== undefined) {
        conditions.push(`project_id = $${i++}`);
        values.push(filters.project_id);
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const result = await pool.query<JournalEntry>(
        `SELECT * FROM journal_entries ${where} ORDER BY create_date DESC`,
        values
    );
    return result.rows;
};

export const createJournalEntry = async (entry: JournalEntry): Promise<JournalEntry> => {
    const { title, body, entry_month, project_id } = entry;
    const month = normalizeMonth(entry_month);
    const result = await pool.query<JournalEntry>(
        `INSERT INTO journal_entries (title, body, entry_month, project_id)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [title ?? null, body, month, project_id ?? null]
    );
    return result.rows[0];
};

export const updateJournalEntry = async (id: string, entry: JournalEntry): Promise<JournalEntry> => {
    const { title, body, entry_month, project_id } = entry;
    const month = normalizeMonth(entry_month);
    const result = await pool.query<JournalEntry>(
        `UPDATE journal_entries
         SET title = $1,
             body = $2,
             entry_month = $3,
             project_id = $4
         WHERE id = $5
         RETURNING *`,
        [title ?? null, body, month, project_id ?? null, id]
    );
    return result.rows[0];
};

export const deleteJournalEntry = async (id: string): Promise<boolean> => {
    const result = await pool.query('DELETE FROM journal_entries WHERE id = $1', [id]);
    return result.rowCount === 1;
};
