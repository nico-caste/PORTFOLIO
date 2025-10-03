import Link from 'next/link';
import { AdminLayout } from '../../components/admin/AdminLayout';

export default function Dashboard() {
  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/profile" className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
          <h2 className="text-2xl font-bold">Gestionar Perfil</h2>
        </Link>
        <Link href="/admin/projects" className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
          <h2 className="text-2xl font-bold">Gestionar Proyectos</h2>
        </Link>
        <Link href="/admin/formation" className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
          <h2 className="text-2xl font-bold">Gestionar Formación</h2>
        </Link>
      </div>
    </AdminLayout>
  );
}