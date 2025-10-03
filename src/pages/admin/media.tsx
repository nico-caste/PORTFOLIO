import { AdminLayout } from '../../components/admin/AdminLayout';
import { ImageUploader } from '../../components/admin/ImageUploader';

export default function MediaPage() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Gestionar Medios</h1>
      <ImageUploader />
      {/* Opcional: Aquí podrías añadir en el futuro una galería con las imágenes subidas */}
    </AdminLayout>
  );
}