import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { ProfileForm, type ProfileFormData } from '../../../components/admin/ProfileForm';
import dbConnect from '../../../lib/mongodb';
import Profile, { type ProfileData } from '../../../models/Profile';

interface EditProfileProps {
  profile: ProfileData;
}

export default function EditProfilePage({ profile }: EditProfileProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    setSuccessMessage('');
    const res = await fetch(`/api/profile/${profile._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setIsSaving(false);
    if (res.ok) {
      setSuccessMessage('¡Perfil actualizado con éxito!');
    } else {
      alert('Error al actualizar el perfil.');
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Gestionar Perfil</h1>
      {successMessage && <p className="bg-green-500 text-white p-2 rounded mb-4">{successMessage}</p>}
      <ProfileForm onSubmit={handleSubmit} initialData={profile} isSaving={isSaving} />
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();
  
  const profile = await Profile.findOne({}).lean();
  
  if (!profile) {
    return { notFound: true };
  }

  return {
    props: {
      profile: JSON.parse(JSON.stringify(profile)),
    },
  };
};