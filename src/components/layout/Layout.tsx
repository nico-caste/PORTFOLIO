import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ProfileData } from '../../models/Profile';

interface LayoutProps {
  children: ReactNode;
  profileData: ProfileData | null;
}

export const Layout = ({ children, profileData }: LayoutProps) => {
  if (!profileData) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
        <Header fullName="Cargando..." />
        <main className="flex-grow container mx-auto px-6 py-8">
          {/* --- Esqueleto de Carga --- */}
          <div className="space-y-12 animate-pulse">
            {/* Esqueleto de la primera sección */}
            <div className="space-y-4">
              <div className="h-8 w-1/3 rounded bg-gray-700"></div>
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-700"></div>
                <div className="h-4 w-full rounded bg-gray-700"></div>
                <div className="h-4 w-5/6 rounded bg-gray-700"></div>
              </div>
            </div>
            {/* Esqueleto de la segunda sección */}
            <div className="space-y-4">
              <div className="h-8 w-1/2 rounded bg-gray-700"></div>
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-700"></div>
                <div className="h-4 w-4/6 rounded bg-gray-700"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Header fullName={profileData.fullName} />
      <main className="flex-grow container mx-auto px-6 py-8">
        {children}
      </main>
      <Footer contact={profileData.contact} />
    </div>
  );
};