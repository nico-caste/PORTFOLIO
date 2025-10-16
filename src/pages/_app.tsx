import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '../components/layout/Layout';
import { ProfileData } from '../models/Profile';

interface MyAppProps extends AppProps {
  pageProps: {
    profile?: ProfileData | null;
    [key: string]: unknown;
  };
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <Layout profileData={pageProps.profile || null}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;