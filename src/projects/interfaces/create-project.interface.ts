import type { Response } from '../../interfaces';
import type { Project } from './project.interface';

export interface CreateProjectOptions {
  name: string;
  description?: string;
  color: string;
  logoUrl?: string;
}

export type CreateProjectResponse = Response<Project>;
