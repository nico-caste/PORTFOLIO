import { useState, FormEvent, ChangeEvent } from 'react';
import { type ProjectData } from '../../models/Projects';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import StarterKit from '@tiptap/starter-kit';

export type ProjectFormData = Omit<ProjectData, '_id' | 'slug'>;

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  initialData?: ProjectData;
  isSaving: boolean;
}

export const ProjectForm = ({ onSubmit, initialData, isSaving }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    repositoryUrl: initialData?.repositoryUrl || '',
    deployUrl: initialData?.deployUrl || '',
    technologies: initialData?.technologies || [],
  });
  
  const editor = useEditor({
    extensions: [ StarterKit, BubbleMenuExtension ],
    content: initialData?.description || '',
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
      },
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'technologies') {
      setFormData(prev => ({ ...prev, [name]: value.split(',').map(t => t.trim()).filter(Boolean) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!editor) return;

    const finalData: ProjectFormData = {
      ...formData,
      description: editor.getHTML(),
    };
    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div>
        <label htmlFor="name" className="block mb-1">Nombre del Proyecto</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700 border-gray-600 border" />
      </div>
      <div>
        <label htmlFor="description" className="block mb-1">Descripción</label>
          {editor && <BubbleMenu className="flex bg-gray-700 text-white p-1 rounded-lg shadow-xl border border-primary" editor={editor}>
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-accent text-background p-2 rounded' : 'p-2'}>Bold</button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-accent text-background p-2 rounded' : 'p-2'}>Italic</button>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'bg-accent text-background p-2 rounded' : 'p-2'}>H3</button>
          </BubbleMenu>}
          <EditorContent editor={editor} />
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