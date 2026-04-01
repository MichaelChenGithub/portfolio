import { lakehouseProject } from './lakehouseProject';
import { supportingProjects } from './supportingProjects';

const projectDetailEntries = [
  { project: lakehouseProject },
  ...supportingProjects.map((project) => ({ project })),
];

export const projectDetailRegistry = Object.fromEntries(
  projectDetailEntries.map((entry) => [entry.project.slug, entry]),
);

export const allProjects = projectDetailEntries.map((entry) => entry.project);

export const projectBySlug = Object.fromEntries(
  allProjects.map((project) => [project.slug, project]),
);

export { lakehouseProject, supportingProjects };
