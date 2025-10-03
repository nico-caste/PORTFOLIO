import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { type ProjectData } from '../../../models/Projects';
import dbConnect from '../../../lib/mongodb';
import Project from '../../../models/Projects';
import { AdminLayout } from '../../../components/admin/AdminLayout';

interface AdminProjectsProps {
  projects: ProjectData[];
}

export default function AdminProjects({ projects }: AdminProjectsProps) {
  const [projectList, setProjectList] = useState(projects);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setError(null);
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjectList(prev => prev.filter(p => p._id !== id));
      } else {
        setError('Error al eliminar el proyecto. Inténtalo de nuevo.');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Proyectos</h1>
        <Link href="/admin/projects/new" className="bg-green-500 px-4 py-2 rounded font-bold hover:bg-green-600">
          Crear Nuevo
        </Link>
      </div>
      {error && <p className="bg-red-500 text-white p-2 rounded mb-4">{error}</p>}
      <div className="bg-gray-800 rounded-lg p-4">
        {projectList.map((project) => (
          <div key={project._id} className="flex justify-between items-center p-2 border-b border-gray-700 last:border-b-0">
            <span>{project.name}</span>
            <div>
              <Link href={`/admin/projects/${project._id}`} className="text-yellow-400 mr-4 hover:underline">
                Editar
              </Link>
              <button onClick={() => handleDelete(project._id)} className="text-red-500 hover:underline">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
    },
  };
};