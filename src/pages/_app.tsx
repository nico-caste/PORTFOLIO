import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { Layout } from '../components/layout/Layout';
import { IProfile } from '../models/Profile';

interface MyAppProps extends AppProps {
  profileData: IProfile | null; // Puede ser null si la API falla
}

function MyApp({ Component, pageProps, profileData }: MyAppProps) {
  return (
    <Layout profileData={profileData}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  console.log('Intentando conectar a:', `${baseUrl}/api/profile`);
  try {
    const res = await fetch(`${baseUrl}/api/profile`);
    if (!res.ok) {
      console.error('Failed to fetch profile data:', res.statusText);
      return { ...appProps, profileData: null };
    }
    
    const profileResponse = await res.json();
    
    return {
      ...appProps,
      profileData: profileResponse.data,
    };

  } catch (error) {
    console.error('An error occurred while fetching profile data:', error);
    return { ...appProps, profileData: null };
  }
};

export default MyApp;