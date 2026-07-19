export interface JournalEntry {
    id?: number;
    title?: string | null;
    body: string;
    entry_month: string; // YYYY-MM-01
    project_id?: number | null;
    create_date?: string;
}
