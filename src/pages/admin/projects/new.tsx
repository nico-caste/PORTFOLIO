import { useRouter } from 'next/router';
import { useState } from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { ProjectForm, type ProjectFormData } from '../../../components/admin/ProjectForm';

export default function NewProjectPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (data: ProjectFormData) => {
    setIsSaving(true);
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/admin/projects');
    } else {
      alert('Error al crear el proyecto');
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Proyecto</h1>
      <ProjectForm onSubmit={handleSubmit} isSaving={isSaving} />
    </AdminLayout>
  );
}