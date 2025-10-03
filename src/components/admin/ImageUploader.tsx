import { useState, ChangeEvent } from 'react';
import Image from 'next/image';

export const ImageUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setUploadedImageUrl(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Error al subir la imagen.');
      }

      setUploadedImageUrl(result.data.secure_url);

    } catch (err: unknown) {
      if (err instanceof Error) {
      } else {
        setError('Ocurrió un error desconocido al subir la imagen.');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Subir Nueva Imagen</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
      />
      {uploading && <p className="mt-4 text-cyan-400">Subiendo...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {uploadedImageUrl && (
        <div className="mt-6">
          <h3 className="font-bold">¡Imagen subida con éxito!</h3>
          <p className="text-sm text-gray-400 mb-2">Puedes copiar esta URL para usarla en tus formularios.</p>
          <input
            type="text"
            readOnly
            value={uploadedImageUrl}
            className="w-full p-2 rounded bg-gray-700 border-gray-600 border"
            onFocus={(e) => e.target.select()} // Seleccionar todo al hacer clic
          />
          <div className="mt-4">
            <Image
              src={uploadedImageUrl}
              alt="Vista previa de la imagen subida"
              width={320}
              height={180}
              className="rounded-lg"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};