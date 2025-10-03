// src/pages/_app.tsx
import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { Layout } from '../components/layout/Layout';
import { IProfile } from '../models/Profile';

// 1. Extendemos AppProps para que TypeScript conozca nuestra nueva prop
interface MyAppProps extends AppProps {
  profileData: IProfile | null; // Puede ser null si la API falla
}

// 2. El componente principal ahora recibe 'profileData'
function MyApp({ Component, pageProps, profileData }: MyAppProps) {
  return (
    <Layout profileData={profileData}>
      <Component {...pageProps} />
    </Layout>
  );
}

// --- 3. Lógica de Obtención de Datos Global ---
// Esta es la parte crucial. Se ejecuta en el servidor antes de renderizar cualquier página.
MyApp.getInitialProps = async (appContext: AppContext) => {
  // Primero, ejecutamos el getInitialProps original para obtener las pageProps
  const appProps = await App.getInitialProps(appContext);

  // Definimos la URL base de nuestra API en un archivo .env.local
  // Esto es VITAL porque el código del servidor no sabe qué es "localhost:3000"
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  console.log('Intentando conectar a:', `${baseUrl}/api/profile`);

  try {
    const res = await fetch(`${baseUrl}/api/profile`);
    
    // Si la respuesta de la API no es exitosa, devolvemos las props sin datos de perfil
    if (!res.ok) {
      console.error('Failed to fetch profile data:', res.statusText);
      return { ...appProps, profileData: null };
    }
    
    const profileResponse = await res.json();
    
    // Devolvemos las props de la página y añadimos nuestros datos del perfil
    return {
      ...appProps,
      profileData: profileResponse.data,
    };

  } catch (error) {
    console.error('An error occurred while fetching profile data:', error);
    // Si hay un error de red o de otro tipo, también devolvemos null
    return { ...appProps, profileData: null };
  }
};

export default MyApp;