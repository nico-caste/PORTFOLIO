import { GetStaticProps, NextPage } from 'next';
import { ProjectData } from '../models/Projects';
import { ProfileData } from '../models/Profile';
import dbConnect from '../lib/mongodb';
import Project from '../models/Projects';
import Profile from '../models/Profile';
import mongoose from 'mongoose';

type LeanProject = Omit<ProjectData, '_id'> & { _id: mongoose.Types.ObjectId };
type LeanProfile = Omit<ProfileData, '_id'> & { _id: mongoose.Types.ObjectId };


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
    await dbConnect();
    
    const projectsResult = await Project.find({}).sort({ createdAt: -1 }).lean() as unknown as LeanProject[];
    const profileResult = await Profile.findOne({}).lean() as unknown as LeanProfile | null;

    const serializableProjects = projectsResult.map(project => ({
      ...project,
      _id: project._id.toString(),
    }));

    const serializableProfile = profileResult ? {
      ...profileResult,
      _id: profileResult._id.toString(),
    } : null;

    return {
      props: { 
        projects: serializableProjects,
        profile: serializableProfile,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error al obtener los datos de la página de proyectos:", error);
    return { props: { projects: [], profile: null } };
  }
};

export default ProjectsPage;
