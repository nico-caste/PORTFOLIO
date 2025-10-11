import { GetStaticProps, NextPage } from 'next';
import { ProjectData } from '../models/Projects';
import { ProfileData } from '../models/Profile';
import projectsApiHandler from './api/projects';
import profileApiHandler from './api/profile';
import { NextApiRequest, NextApiResponse } from 'next';

type ProjectsApiResponse = { success: boolean; data?: ProjectData[] };
type ProfileApiResponse = { success: boolean; data?: ProfileData };

interface ProjectsPageProps {
  projects: ProjectData[];
  profile: ProfileData | null;
}

const ProjectsPage: NextPage<ProjectsPageProps> = ({ projects, profile }) => {
  return (
    <div>
      {profile && (
        <div className="mb-12 bg-surface border border-primary rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-3">Construcción del Portfolio</h2>
          <p className="text-text-secondary leading-relaxed">{profile.portfolioSummary}</p>
        </div>
      )}
      <h1 className="text-4xl font-bold mb-8 text-cyan-400">Mis Proyectos</h1>
      <div className="space-y-8">
        {projects.map((project) => (
          <div key={project._id} className="group bg-surface border border-primary rounded-lg shadow-lg">
            <div className="p-6">
              <h2 className="text-3xl font-black mb-2">{project.name}</h2>
              <p className="text-text-secondary mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4 mt-4 pt-4 border-t border-gray-700">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-primary text-cyan-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4 text-xl">
                <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="font-bold hover:text-cyan-400 transition-colors">
                  Ver Código
                </a>
                {project.deployUrl && (
                  <a href={project.deployUrl} target="_blank" rel="noopener noreferrer" className="font-bold hover:text-cyan-400 transition-colors">
                    Ver Deploy
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    let projectsData: ProjectData[] = [];
    let profileData: ProfileData | null = null;

    const req = { method: 'GET' } as NextApiRequest;

    const projectsRes = {
      status: () => ({ json: (body: ProjectsApiResponse) => { projectsData = body.data || []; } }),
    } as unknown as NextApiResponse;
    await projectsApiHandler(req, projectsRes);
    
    const profileRes = {
      status: () => ({ json: (body: ProfileApiResponse) => { profileData = body.data || null; } }),
    } as unknown as NextApiResponse;
    await profileApiHandler(req, profileRes);

    return {
      props: { 
        projects: projectsData,
        profile: profileData,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Failed to fetch data for projects page:", error);
    return { props: { projects: [], profile: null } };
  }
};

export default ProjectsPage;
