import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { type FormationData } from '../../models/Formation';

export type FormationFormData = Omit<FormationData, '_id'>;

interface FormationFormProps {
  onSubmit: (data: FormationFormData) => void;
  initialData?: FormationData;
  isSaving: boolean;
}

export const FormationForm = ({ onSubmit, initialData, isSaving }: FormationFormProps) => {
  const [formData, setFormData] = useState<FormationFormData>({
    title: initialData?.title || '',
    institution: initialData?.institution || '',
    type: initialData?.type || 'Curso',
    startDate: initialData?.startDate ? initialData.startDate.split('T')[0] : '',
    endDate: initialData?.endDate ? initialData.endDate.split('T')[0] : '',
    certificateUrl: initialData?.certificateUrl || '',
    skills: initialData?.skills || [],
  });

  const [skillsInput, setSkillsInput] = useState(initialData?.skills?.join(', ') || '');
  useEffect(() => {
    const skillsArray = skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData(prev => ({ ...prev, skills: skillsArray }));
  }, [skillsInput]);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
       <div>
        <label htmlFor="title" className="block mb-1">Título</label>
        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700 border-gray-600 border" />
      </div>
      <div>
        <label htmlFor="institution" className="block mb-1">Institución</label>
        <input type="text" name="institution" id="institution" value={formData.institution} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700 border-gray-600 border" />
      </div>
      <div>
        <label htmlFor="type" className="block mb-1">Tipo</label>
        <select name="type" id="type" value={formData.type} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700 border-gray-600 border">
          <option value="Curso">Curso</option>
          <option value="Certificación">Certificación</option>
          <option value="Carrera">Carrera</option>
        </select>
      </div>
      <div>
        <label htmlFor="startDate" className="block mb-1">Fecha de Inicio</label>
        <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700 border-gray-600 border" />
      </div>
      <div>
        <label htmlFor="endDate" className="block mb-1">Fecha de Fin (Opcional)</label>
        <input type="date" name="endDate" id="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 border-gray-600 border" />
      </div>
      <div>
        <label htmlFor="certificateUrl" className="block mb-1">URL del Certificado (Opcional)</label>
        <input type="text" name="certificateUrl" id="certificateUrl" value={formData.certificateUrl} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 border-gray-600 border" />
      </div>
      <div>
        <label htmlFor="skills" className="block mb-1">Aptitudes (separadas por coma)</label>
        <input 
          type="text" 
          name="skills" 
          id="skills" 
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)} 
          required 
          className="w-full p-2 rounded bg-gray-700 border-gray-600 border" 
        />
      </div>

      <button type="submit" disabled={isSaving} className="bg-cyan-500 px-6 py-2 rounded font-bold hover:bg-cyan-600 disabled:bg-gray-500 transition-colors">
        {isSaving ? 'Guardando...' : 'Guardar Formación'}
      </button>
    </form>
  );
};