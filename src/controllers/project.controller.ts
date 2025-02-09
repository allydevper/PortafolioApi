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

export const createProject = async (project?: Project): Promise<PostgrestError | null> => {
    const { error } = await supabase
        .from('projects')
        .insert([project]);

    if (error) {
        throw new Error(error.message);
    }

    return error;
}; 