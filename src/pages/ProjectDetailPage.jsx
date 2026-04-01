import { Navigate, useParams } from 'react-router-dom';
import { ProjectArticleLayout } from '../components/ProjectArticleLayout';
import { projectDetailRegistry } from '../content/projects';

export function ProjectDetailPage() {
  const { slug } = useParams();
  const detailEntry = slug ? projectDetailRegistry[slug] : null;

  if (!detailEntry) {
    return <Navigate to="/projects" replace />;
  }

  const CustomComponent = detailEntry.component;

  if (CustomComponent) {
    return <CustomComponent project={detailEntry.project} />;
  }

  return <ProjectArticleLayout project={detailEntry.project} />;
}
