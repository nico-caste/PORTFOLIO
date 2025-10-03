import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

const navLinks = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/profile', label: 'Perfil' },
  { href: '/admin/projects', label: 'Proyectos' },
  { href: '/admin/formation', label: 'Formación' },
  { href: '/admin/media', label: 'Medios' },
];

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <aside className="w-64 bg-gray-800 p-4">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav>
          <ul>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link 
                  href={href} 
                  className={`block py-2 px-3 rounded transition ${
                    router.pathname.startsWith(href) ? 'bg-cyan-500' : 'hover:bg-gray-700'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};