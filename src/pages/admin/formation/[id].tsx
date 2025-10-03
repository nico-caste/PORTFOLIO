import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { FormationForm, type FormationFormData } from '../../../components/admin/FormationForm';
import dbConnect from '../../../lib/mongodb';
import Formation, { type FormationData } from '../../../models/Formation';

interface EditFormationProps {
  formation: FormationData;
}

export default function EditFormationPage({ formation }: EditFormationProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (data: FormationFormData) => {
    setIsSaving(true);
    const payload = { ...data };
    if (!payload.endDate) delete (payload as FormationFormData).endDate;
    if (!payload.certificateUrl) delete (payload as FormationFormData).certificateUrl;
    
    const res = await fetch(`/api/formation/${formation._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/formation');
    } else {
      alert('Error al actualizar el item.');
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Editar Formación</h1>
      <FormationForm onSubmit={handleSubmit} initialData={formation} isSaving={isSaving} />
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  await dbConnect();
  
  const formation = await Formation.findById(id).lean();
  if (!formation) {
    return { notFound: true };
  }

  return {
    props: {
      formation: JSON.parse(JSON.stringify(formation)),
    },
  };
};