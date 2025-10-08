import { AdminLayout } from '../../components/admin/AdminLayout';
import { ImageUploader } from '../../components/admin/ImageUploader';

export default function MediaPage() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Gestionar Medios</h1>
      <ImageUploader />
    </AdminLayout>
  );
}