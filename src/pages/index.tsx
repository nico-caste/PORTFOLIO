import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { ProfileData } from '../models/Profile';
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiMapPin } from 'react-icons/fi';
import { FormationData } from '../models/Formation';
import profileApiHandler from './api/profile';
import formationApiHandler from './api/formation';
import { NextApiRequest, NextApiResponse } from 'next';

type ProfileApiResponse = { success: boolean; data?: ProfileData };
type FormationApiResponse = { success: boolean; data?: FormationData[] };

interface HomePageProps {
  profile: ProfileData | null;
  formations: FormationData[];
}

export default function HomePage({ profile, formations }: HomePageProps) {
  if (!profile) {
    return null;
  }

  const formationsWithCerts = formations.filter(f => f.certificateUrl);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
      {/* Columna Principal (Izquierda) */}
      <div className="lg:col-span-2 space-y-8">
        {/* Sección de Perfil */}
        <div className="bg-surface border border-primary rounded-lg p-6 shadow-lg">
          <h1 className="text-5xl lg:text-6xl font-black text-white">{profile.fullName}</h1>
          <div className="flex items-center space-x-2 text-text-secondary">
            <FiMapPin />
            <span>{profile.locality}</span>
          </div>
          <div className="prose prose-invert prose-lg max-w-none text-text-main">
            <p>{profile.aboutSummary}</p>
          </div>
        </div>

        {/* Galería de Certificados */}
        {formationsWithCerts.length > 0 && (
          <div className="bg-surface border border-primary rounded-lg p-6 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Certificaciones Destacadas</h2>
            <div className="flex flex-wrap gap-4">
              {formationsWithCerts.map((cert: FormationData) => (
                <a 
                  key={cert._id} 
                  href={cert.certificateUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative block border-2 border-primary hover:border-cyan-400 transition-colors duration-300 rounded-lg overflow-hidden shadow-lg"
                >
                  <Image
                    src={cert.certificateUrl!}
                    alt={`Certificado de ${cert.title}`}
                    width={200}
                    height={140}
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-cyan-400 text-center font-bold px-2">{cert.title}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Columna Lateral (Derecha) */}
      <div className="space-y-8">
        {/* Tarjeta de Aptitudes */}
        <div className="bg-surface border border-primary rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Aptitudes</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span key={skill} className="bg-primary text-xs font-semibold px-3 py-1 rounded-full text-cyan-400">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Tarjeta de Contacto */}
        <div className="bg-surface border border-primary rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Contacto</h2>
          <div className="space-y-4">
            <a href={`mailto:${profile.contact.email}`} className="flex items-center space-x-3 text-text-main hover:text-cyan-400 transition-colors">
              <FiMail size={20} />
              <span>{profile.contact.email}</span>
            </a>
            <a href={`tel:${profile.contact.phone.replace(/\s/g, '')}`} className="flex items-center space-x-3 text-text-main hover:text-cyan-400 transition-colors">
              <FiPhone size={20} />
              <span>{profile.contact.phone}</span>
            </a>
            <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-text-main hover:text-cyan-400 transition-colors">
              <FiLinkedin size={20} />
              <span>LinkedIn</span>
            </a>
            <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-text-main hover:text-cyan-400 transition-colors">
              <FiGithub size={20} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    let profileData: ProfileData | null = null;
    let formationsData: FormationData[] = [];
    const req = {} as NextApiRequest;

    const profileRes = {
      status: (code: number) => ({
        json: (body: ProfileApiResponse) => {
          if (code === 200) profileData = body.data || null;
        },
      }),
    } as unknown as NextApiResponse;
    await profileApiHandler(req, profileRes);

    const formationRes = {
      status: (code: number) => ({
        json: (body: FormationApiResponse) => {
          if (code === 200) formationsData = body.data || [];
        },
      }),
    } as unknown as NextApiResponse;
    await formationApiHandler(req, formationRes);
    
    return {
      props: {
        profile: profileData,
        formations: formationsData,
      },
    };
  } catch (error) {
    console.error("Error al obtener los datos de la página de inicio:", error);
    return { props: { profile: null, formations: [] } };
  }
};
