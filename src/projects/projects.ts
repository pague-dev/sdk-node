import { BaseResource } from '../common';
import type {
  CreateProjectOptions,
  ListProjectsOptions,
  Project,
} from './interfaces';

export class Projects extends BaseResource<Project, CreateProjectOptions, ListProjectsOptions> {
  protected readonly endpoint = '/projects';
}
