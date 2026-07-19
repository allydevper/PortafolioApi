export interface Todo {
    id?: number;
    title: string;
    description?: string | null;
    done?: boolean;
    project_id?: number | null;
    create_date?: string;
    update_date?: string;
}
