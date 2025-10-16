import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { label: 'Proyectos', path: '/proyectos' },
  { label: 'Formación', path: '/formacion' },
];

interface HeaderProps {
  fullName: string;
}

export const Header = ({}: HeaderProps) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 flex justify-center">
      <nav className="container mx-980 px-6 py-4 flex justify-between items-center bg-background/70 backdrop-blur-lg shadow-md rounded-b-xl">
        <Link href="/" className="text-2xl font-bold hover:text-cyan-400 transition-colors">
          Inicio
        </Link>
        <ul className="flex items-center space-x-6">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`pb-1 border-b-2 ${
                  router.pathname === item.path
                    ? 'border-cyan-400 text-cyan-400' //activo
                    : 'border-transparent hover:border-cyan-400 hover:text-cyan-400' //inactivo
                } transition-colors`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};