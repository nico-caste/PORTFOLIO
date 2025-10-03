import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { ProjectForm, type ProjectFormData } from '../../../components/admin/ProjectForm';
import dbConnect from '../../../lib/mongodb';
import Project, { type ProjectData } from '../../../models/Projects';

interface EditProjectProps {
  project: ProjectData;
}

export default function EditProjectPage({ project }: EditProjectProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (data: ProjectFormData) => {
    setIsSaving(true);
    const res = await fetch(`/api/projects/${project._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/admin/projects');
    } else {
      alert('Error al actualizar el proyecto');
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Editar Proyecto: {project.name}</h1>
      <ProjectForm onSubmit={handleSubmit} initialData={project} isSaving={isSaving} />
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  await dbConnect();
  
  const project = await Project.findById(id).lean();
  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      project: JSON.parse(JSON.stringify(project)),
    },
  };
};