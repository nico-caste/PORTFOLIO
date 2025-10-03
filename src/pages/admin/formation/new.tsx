import { useRouter } from 'next/router';
import { useState } from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { FormationForm, type FormationFormData } from '../../../components/admin/FormationForm';

export default function NewFormationPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (data: FormationFormData) => {
    setIsSaving(true);
    const payload = { ...data };
    if (!payload.endDate) delete (payload as FormationFormData).endDate;
    if (!payload.certificateUrl) delete (payload as FormationFormData).certificateUrl;

    const res = await fetch('/api/formation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/formation');
    } else {
      alert('Error al crear el item.');
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Añadir Nueva Formación</h1>
      <FormationForm onSubmit={handleSubmit} isSaving={isSaving} />
    </AdminLayout>
  );
}