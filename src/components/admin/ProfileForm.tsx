import { useState, FormEvent, useEffect } from 'react';
import { type ProfileData } from '../../models/Profile';

export type ProfileFormData = Omit<ProfileData, '_id'>;

interface ProfileFormProps {
  onSubmit: (data: ProfileFormData) => void;
  initialData?: ProfileData;
  isSaving: boolean;
}

export const ProfileForm = ({ onSubmit, initialData, isSaving }: ProfileFormProps) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: initialData?.fullName || '',
    locality: initialData?.locality || '',
    aboutSummary: initialData?.aboutSummary || '',
    portfolioSummary: initialData?.portfolioSummary || '',
    contact: initialData?.contact || {
      email: '',
      phone: '',
      linkedin: '',
      github: '',
    },
    skills: initialData?.skills || [],
  });

  const [skillsInput, setSkillsInput] = useState(initialData?.skills?.join(', ') || '');

  useEffect(() => {
    const skillsArray = skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData(prev => ({ ...prev, skills: skillsArray }));
  }, [skillsInput]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [name]: value,
      }
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div>
        <label htmlFor="fullName" className="block mb-1">Nombre Completo</label>
        <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700 border-gray-600 border" />
      </div>
      <div>
        <label htmlFor="locality" className="block mb-1">Localidad</label>
        <input type="text" name="locality" id="locality" value={formData.locality} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700 border-gray-600 border" placeholder="Ej: La Plata, Buenos Aires" />
      </div>
      <div>
        <label htmlFor="aboutSummary" className="block mb-1">Resumen Acerca de Mí</label>
        <textarea name="aboutSummary" id="aboutSummary" value={formData.aboutSummary} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700 border-gray-600 border" rows={5} />
      </div>
      <div>
        <label htmlFor="portfolioSummary" className="block mb-1">Resumen del Portfolio</label>
        <textarea name="portfolioSummary" id="portfolioSummary" value={formData.portfolioSummary} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700 border-gray-600 border" rows={3} />
      </div>
      <h3 className="text-xl font-bold pt-4">Información de Contacto</h3>
      <div>
        <label htmlFor="email" className="block mb-1">Email</label>
        <input type="email" name="email" id="email" value={formData.contact.email} onChange={handleContactChange} required className="w-full p-2 rounded bg-gray-700 border-gray-600 border" />
      </div>
      <div>
        <label htmlFor="phone" className="block mb-1">Teléfono</label>
        <input type="text" name="phone" id="phone" value={formData.contact.phone} onChange={handleContactChange} required className="w-full p-2 rounded bg-gray-700 border-gray-600 border" />
      </div>
      <div>
        <label htmlFor="linkedin" className="block mb-1">URL de LinkedIn</label>
        <input type="text" name="linkedin" id="linkedin" value={formData.contact.linkedin} onChange={handleContactChange} required className="w-full p-2 rounded bg-gray-700 border-gray-600 border" />
      </div>
      <div>
        <label htmlFor="github" className="block mb-1">URL de GitHub</label>
        <input type="text" name="github" id="github" value={formData.contact.github} onChange={handleContactChange} required className="w-full p-2 rounded bg-gray-700 border-gray-600 border" />
      </div>
            <h3 className="text-xl font-bold pt-4">Lista Principal de Aptitudes</h3>
      <div>
        <label htmlFor="skills" className="block mb-1">Aptitudes (separadas por coma)</label>
        <input 
          type="text" 
          name="skills" 
          id="skills" 
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)} 
          className="w-full p-2 rounded bg-gray-700 border-gray-600 border" 
        />
      </div>
      <button type="submit" disabled={isSaving} className="bg-cyan-500 px-6 py-2 rounded font-bold hover:bg-cyan-600 disabled:bg-gray-500 transition-colors">
        {isSaving ? 'Guardando...' : 'Guardar Cambios'}
      </button>
    </form>
  );
};