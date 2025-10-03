import { useState, FormEvent } from 'react';
import { type ProjectData } from '../../models/Projects';

export type ProjectFormData = Omit<ProjectData, '_id' | 'slug'>;

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  initialData?: ProjectData;
  isSaving: boolean;
}

export const ProjectForm = ({ onSubmit, initialData, isSaving }: ProjectFormProps) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    repositoryUrl: initialData?.repositoryUrl || '',
    deployUrl: initialData?.deployUrl || '',
    technologies: initialData?.technologies || [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'technologies') {
      setFormData(prev => ({ ...prev, [name]: value.split(',').map(t => t.trim()) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div>
        <label htmlFor="name" className="block mb-1">Nombre del Proyecto</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700 border-gray-600 border" />
      </div>
      <div>
        <label htmlFor="description" className="block mb-1">Descripción</label>
        <textarea name="description" id="description" value={formData.description} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700 border-gray-600 border" rows={4} />
      </div>
      <div>
        <label htmlFor="repositoryUrl" className="block mb-1">URL del Repositorio (GitHub)</label>
        <input type="text" name="repositoryUrl" id="repositoryUrl" value={formData.repositoryUrl} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700 border-gray-600 border" />
      </div>
      <div>
        <label htmlFor="deployUrl" className="block mb-1">URL del Deploy (Opcional)</label>
        <input type="text" name="deployUrl" id="deployUrl" value={formData.deployUrl} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 border-gray-600 border" />
      </div>
      <div>
        <label htmlFor="technologies" className="block mb-1">Tecnologías (separadas por coma)</label>
        <input type="text" name="technologies" id="technologies" value={formData.technologies.join(', ')} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700 border-gray-600 border" />
      </div>
      <button type="submit" disabled={isSaving} className="bg-cyan-500 px-6 py-2 rounded font-bold hover:bg-cyan-600 disabled:bg-gray-500 transition-colors">
        {isSaving ? 'Guardando...' : 'Guardar Proyecto'}
      </button>
    </form>
  );
};