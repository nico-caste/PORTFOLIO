import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { FormationData } from '../../../models/Formation';
import dbConnect from '../../../lib/mongodb';
import Formation from '../../../models/Formation';

interface AdminFormationProps {
  formations: FormationData[];
}

export default function AdminFormation({ formations }: AdminFormationProps) {
  const [formationList, setFormationList] = useState(formations);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setError(null);
    if (confirm('¿Estás seguro de que quieres eliminar este item?')) {
      const res = await fetch(`/api/formation/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFormationList(prev => prev.filter(f => f._id !== id));
      } else {
        setError('Error al eliminar el item. Inténtalo de nuevo.');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Formación</h1>
        <Link href="/admin/formation/new" className="bg-green-500 px-4 py-2 rounded font-bold hover:bg-green-600">
          Añadir Nuevo
        </Link>
      </div>
      {error && <p className="bg-red-500 text-white p-2 rounded mb-4">{error}</p>}
      <div className="bg-gray-800 rounded-lg p-4">
        {formationList.map((item) => (
          <div key={item._id} className="flex justify-between items-center p-2 border-b border-gray-700 last:border-b-0">
            <div>
              <span className="font-bold">{item.title}</span>
              <span className="text-sm text-gray-400 block">{item.institution}</span>
            </div>
            <div>
              <Link href={`/admin/formation/${item._id}`} className="text-yellow-400 mr-4 hover:underline">
                Editar
              </Link>
              <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:underline">
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
  const formations = await Formation.find({}).sort({ startDate: -1 }).lean();
  return {
    props: {
      formations: JSON.parse(JSON.stringify(formations)),
    },
  };
};