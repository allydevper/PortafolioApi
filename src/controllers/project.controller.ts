import { Project } from '../models/project.interface';
import { createClient, PostgrestError } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getProjects = async (): Promise<Project[]> => {
    const { data, error } = await supabase
        .from('projects')
        .select('*');

    if (error) {
        throw new Error(error.message);
    }

    return data as Project[];
};

export const getLastestsProjects = async (): Promise<Project[]> => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('create_date', { ascending: false })
        .limit(4);

    if (error) {
        throw new Error(error.message);
    }

    return data as Project[];
};


export const createProject = async (project?: Project): Promise<Project> => {
    const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select('*')
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data as Project;
};

export const updateProject = async (id: string, project: Project): Promise<PostgrestError | null> => {
    const { data, error } = await supabase
        .from('projects')
        .update(project)
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const deleteProject = async (id: string): Promise<PostgrestError | null> => {
    const { data, error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};